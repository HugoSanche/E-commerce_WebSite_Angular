import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { MyShopFormService } from 'src/app/services/my-shop-form.service';
import { MyProyectValidators } from 'src/app/validators/my-proyect-validators';

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
        firstName:new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(2),
                                    MyProyectValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,
                                  Validators.minLength(2),
                                  MyProyectValidators.notOnlyWhitespace]),
        email:new FormControl('',
                            [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress:this.formBuilder.group({
        country:new FormControl('',
                                  [Validators.required,
                                  Validators.minLength(2),
                                  MyProyectValidators.notOnlyWhitespace]),
        street:new FormControl('',
                                [Validators.required,
                                Validators.minLength(2),
                                MyProyectValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',
                                  [Validators.required,
                                  Validators.minLength(2),
                                  MyProyectValidators.notOnlyWhitespace])
      }),
      billingAddress:this.formBuilder.group({
        country:new FormControl('',
                                  [Validators.required,
                                  Validators.minLength(2),
                                  MyProyectValidators.notOnlyWhitespace]),
        street:new FormControl('',
                                [Validators.required,
                                Validators.minLength(2),
                                MyProyectValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required]),
        state:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',
                                  [Validators.required,
                                  Validators.minLength(2),
                                  MyProyectValidators.notOnlyWhitespace])
      }),
      creditCard:this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),
        nameOnCard:new FormControl('',[Validators.required,Validators.minLength(2),
                                      MyProyectValidators.notOnlyWhitespace]),
        cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
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

    if (this.checkoutFormGroup.invalid){
      //markAllAsTouched(): Touching all fields fields triggers the display of the error messanges

        this.checkoutFormGroup.markAllAsTouched();

    }
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The last Name of client "+this.checkoutFormGroup.get('customer').value.lastName);   
  
    console.log("The shipping Address country is "+this.checkoutFormGroup.get('shippingAddress').value.country.name);   
    console.log("The shipping Address state is "+this.checkoutFormGroup.get('shippingAddress').value.state.name);
  
  }

get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
get email(){return this.checkoutFormGroup.get('customer.email');}


get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}


get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}

get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}

  copyShippingAddressToBillingAddress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

        this.billingAddressStates=this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates=[];

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




