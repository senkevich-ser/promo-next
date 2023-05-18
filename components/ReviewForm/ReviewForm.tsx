import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { API } from "@/helpers/api";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit,formState:{errors},reset } = useForm<IReviewForm>();
  const [isSuccess,setIsSuccess]=useState<boolean>(false);
  const [error,setError]=useState<string>();

  const onSubmit = async(formData: IReviewForm) => {
    try{
      const {data}=await axios.post<IReviewSentResponse>(API.review.createDemo,{...formData,productId});
      if(data.message){
        setIsSuccess(true);
        reset();
      } else{
        setError('Что-то пошло не так');
      }
    } catch{
      setError('Что-то пошло не так. Не верный запрос');
    }
    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register('name',{required:{value:true,message:'Укажите имя'}})}
        error={errors.name}
        placeholder="Имя"
        />
        <Input {...register('title',{required:{value:true,message:'Укажите название'}})} className={styles.title} 
        error={errors.title}
        placeholder="Заголовок отзыва"
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
          control={control}
          name='rating'
          rules={{required:{value:true,message:'Укажите рейтинг'}}}
          render={({field})=>(
            <Rating rating={field.value} ref={field.ref} isEditable setRating={field.onChange} error={errors.rating}/>
          )}
          />
        </div>
        <Textarea {...register('description',{required:{value:true,message:'Укажите текст'}})} 
        className={styles.description} 
        error={errors.description}
        placeholder="Текст отзыва"
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.disclamer}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.panel,styles.success)}>
        <div className={styles.successtitle}>Ваш отзыв отправлен</div>
        <div className={styles.successinfo}>
          Спасибо, Ваш отзыв будет опубликован после проверки.
        </div>
        <CloseIcon className={styles.successicon} onClick={()=>setIsSuccess(false)}/>
      </div>}
      {error && <div className={cn(styles.panel,styles.error)}>
        <div className={styles.successtitle}>Ваш отзыв не отправлен</div>
        <div className={styles.successinfo}>
          Что-то пошло не так, попробуйте обновить страницу.
        </div>
        <CloseIcon className={styles.successicon} onClick={()=>setError(undefined)}/>
      </div>}
    </form>
  );
};
