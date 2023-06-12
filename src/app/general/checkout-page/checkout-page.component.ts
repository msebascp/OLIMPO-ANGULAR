import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  infoAuth!: { isLogin: boolean, isTrainer: boolean };
  isLogin: boolean = false;
  private stripe: Stripe;
  total: number;
  ownerAddres = {};

  constructor(
    private route: ActivatedRoute,
    private auth: AuthPassportService) { }
  async ngOnInit() {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
      this.infoAuth = infoAuth
    })
    this.route.queryParams.subscribe(params => {
      this.total = +params['total'];
    });
    this.stripe = await loadStripe('pk_test_51NG2olACOaQieQETTBDRsgzymtNtkueXmR9JbPPzRDdLm3CJlVUUkVNNnWnrlYy4Ro0fuvqlSF4F8mYrGtrXa1Sf00dQzXbBNY');
    const elements = this.stripe.elements();
    const payment_checkout = elements.create('card');
    const payment_email = elements.create('address', {
      mode: 'shipping',
    });
    payment_email.mount('.payment-address')

    payment_email.on('change', (event) => {
      this.ownerAddres = {
        name: event.value.name,
        firstName: event.value.firstName,
        lastName: event.value.lastName,
        phone: event.value.phone,
        address: {
          line1: event.value.address.line1,
          line2: event.value.address.line2,
          city: event.value.address.city,
          state: event.value.address.state,
          country: event.value.address.country,
          postal_code: event.value.address.postal_code
        }
      }
    })

    payment_checkout.mount('.payment-card')
    payment_checkout.on('change', (event) => {
      const displayErrors = document.getElementById('errors');
      event.error ? displayErrors.textContent = event.error.message : displayErrors.textContent = '';
    })

    const pagarButton = document.getElementById('pagar');
    pagarButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner: this.ownerAddres,
        amount: Number(this.total),
        currency: 'EUR',
      };

      try {
        const result = await this.stripe.createSource(payment_checkout, ownerInfo);
        console.log(result);
        if (result.source) {
          Swal.fire({
            icon: 'success',
            title: 'Tu pago se ha procesado',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch (e) {
        console.warn(e.message);
      }

    })

  }
}
