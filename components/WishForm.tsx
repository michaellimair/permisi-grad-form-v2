import {
  FC,
  memo,
  useCallback,
} from 'react';
import { Graduate } from 'lib/types/Graduate';
import { Wish } from 'lib/types/Wish';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import WishSubmitStatus from 'components/WishSubmitStatus';
import { SubmitProgressEvent, SubmitProgressHandler } from 'lib/utils/useFormSubmit';
import SubmitProgress from 'components/SubmitProgress';
import WishFormFields from 'components/WishFormFields';

const WishForm: FC<{ graduates: Graduate[] }> = ({ graduates }) => {
  const methods = useForm<Wish>();
  const { control, setValue } = useForm<SubmitProgressEvent>({
    defaultValues: {
      progress: 0,
      message: null,
    },
  });
  const {
    reset,
    formState: { isSubmitting, isSubmitted, isSubmitSuccessful },
  } = methods;
  const handleDialogClose = useCallback(() => {
    if (isSubmitSuccessful) {
      reset({
        from: '',
        message: '',
        title: '',
        graduateId: '',
      });
    } else {
      reset(undefined, {
        keepValues: true,
        keepErrors: true,
        keepDirty: true,
        keepTouched: true,
      });
    }
  }, [reset, isSubmitSuccessful]);
  const onProgress: SubmitProgressHandler = useCallback((progressEvent) => {
    setValue('progress', progressEvent.progress);
    setValue('message', progressEvent.message);
  }, [setValue]);

  return (
    <>
      <WishSubmitStatus
        onReset={handleDialogClose}
        isSubmitSuccessful={isSubmitSuccessful}
        isSubmitted={isSubmitted}
      />
      <FormProvider {...methods}>
        <WishFormFields graduates={graduates} onProgress={onProgress} />
      </FormProvider>
      <SubmitProgress control={control} isSubmitting={isSubmitting} />
    </>
  );
};

export default memo(WishForm);
