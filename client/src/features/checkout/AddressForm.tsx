import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import AppCheckbox from '../../app/components/AppCheckbox';
import AppTextInput from '../../app/components/AppTextInput';

export default function AddressForm() {
  // const { control, handleSubmit } = useForm();
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {/* <form onSubmit={handleSubmit((data) => console.log(data))}> */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='fullName' label='Full Name' />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name='address1' label='Address 1' />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name='address2' label='Address 2' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='city' label='City' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='state' label='State' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='zip' label='Zipcode' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='country' label='Country' />
          </Grid>
          <Grid item xs={12}>
            <AppCheckbox name='saveAddress' label='Save this as the default address' control={control}/>
            {/* <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            /> */}
          </Grid>
        </Grid>
        {/*<Button type='submit'>Submit form</Button>
       </form> */}
    </>
  );
}

/* <TextField
  required
  id="firstName"
    name="firstName"
    label="First name"
    fullWidth
  autoComplete="given-name"
    variant="standard"
/> */
