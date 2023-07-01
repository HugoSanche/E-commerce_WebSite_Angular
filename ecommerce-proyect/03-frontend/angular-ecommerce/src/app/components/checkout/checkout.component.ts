import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { MyShopFormService } from 'src/app/services/my-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup:FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;

  creditCardYears: number[]=[];
  creditCardMonths: number[]=[];

  countries:Country[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];

  constructor(private formBuilder:FormBuilder,
              private myShopFormService: MyShopFormService){}
  
  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    // populata credit card months
    const startMonth: number=new Date().getMonth()+1;
    console.log("startMonth: "+startMonth);

    this.myShopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );

    //populate credit card years

    this.myShopFormService.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrieve credit card years: "+JSON.stringify(data));
        this.creditCardYears=data
      }
    )

    //populate countries
      this.myShopFormService.getCountries().subscribe(
        data=>{
          console.log("Retrieved countries: "+JSON.stringify(data));
          this.countries=data;
        }
      );

  }
  onSubmitX(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The last Name of client "+this.checkoutFormGroup.get('customer').value.lastName);   
  }
  copyShippingAddressToBillingAddress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  handleMonthsAndYears(){
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    
    const currentYear: number=new Date().getFullYear();
    const selectedYear:number =Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year, then start with the current month
    let startMonth:number;
    if (currentYear==selectedYear){
      startMonth= new Date().getMonth()+1;
    }
    else{
      startMonth=1;
    }
    this.myShopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
      console.log("Retrieved credit card months: "+JSON.stringify(data));
      this.creditCardMonths=data;
      }
    );
  }
  getStates(formGroupName: string) {
    console.log("Holaaaa");
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.myShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}




