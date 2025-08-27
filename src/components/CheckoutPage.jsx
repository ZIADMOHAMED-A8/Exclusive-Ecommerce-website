import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';
import { clearCart, submitForm } from './cart-slice';
import OrderPlacedModal from './OrderPlcaedModal';
import MyModal from './OrderPlcaedModal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [fieldErrors, setFieldErrors] = useState({});
 
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  let NameRef = useRef();
  let CompanyRef = useRef();
  let streetRef = useRef();
  let apartmenyRef = useRef();
  let cityRef = useRef();
  let phoneNumRef = useRef();
  let emailRef = useRef();
  let Navigate = useNavigate();
  
  function validateField(fieldName, value) {
    let error = '';
    
    switch(fieldName) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        const phoneRegex = /^[+]?[0-9\s\-\(\)]+$/;
        if (value && (!phoneRegex.test(value) || value.length < 10)) {
          error = 'Please enter a valid phone number';
        }
        break;
      default:
        if (!value || value.trim() === '') {
          error = `${fieldName} is required`;
        }
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error === '';
  }

  // دالة للتعامل مع تغيير النص في الحقول
  function handleFieldChange(fieldName, ref) {
    const value = ref.current.value;
    validateField(fieldName, value);
  }

  function checkEmptyField() {
    const requiredFields = [
      { value: NameRef.current?.value, name: "Name" },
      { value: CompanyRef.current?.value, name: "Company" },
      { value: streetRef.current?.value, name: "Street Address" },
      { value: apartmenyRef.current?.value, name: "Apartment" },
      { value: cityRef.current?.value, name: "City" },
      { value: phoneNumRef.current?.value, name: "Phone Number" },
      { value: emailRef.current?.value, name: "Email" },
      { value: paymentMethod, name: "Payment Method" }
    ];
    
    const emptyFields = requiredFields.filter(field => 
      !field.value || field.value.trim() === ''
    );
    
    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map(field => field.name).join(', ');
      toast.error(`Please fill in the following fields: ${emptyFieldNames}`, {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    
    if (!checkEmptyField()) {
      return; 
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRef.current.value)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    // التحقق من رقم الهاتف
    const phoneRegex = /^[+]?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(phoneNumRef.current.value) || phoneNumRef.current.value.length < 10) {
      toast.error("Please enter a valid phone number (at least 10 digits)", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    toast.success("Your order has been placed successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      className: "toast-success"
    });
    
    let Orderobj = {
      checkOutInfo: {
        Name: NameRef.current.value.trim(),
        Company: CompanyRef.current.value.trim(),
        Street: streetRef.current.value.trim(),
        Apartment: apartmenyRef.current.value.trim(),
        City: cityRef.current.value.trim(),
        PhoneNum: phoneNumRef.current.value.trim(),
        Email: emailRef.current.value.trim(),   
        PaymentMethod: paymentMethod
      },
      Order: items,
      totalPrice
    };
    setTimeout(() => {
      dispatch(clearCart());
      Navigate('/');
    }, 1000);
  }

  if (items[0]) {
    return (
      <div className={styles.container}>
        {/* Billing Details */}
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <h2 className={styles.formTitle}>
              Billing Details
            </h2>
            
            <input 
              type="text" 
              placeholder="First Name*" 
              ref={NameRef} 
              required 
              className={styles.input}
              onBlur={() => handleFieldChange('Name', NameRef)}
              style={fieldErrors.Name ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.Name && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.Name}</span>}
            
            <input 
              type="text" 
              placeholder="Company Name" 
              ref={CompanyRef} 
              required 
              className={styles.input}
              onBlur={() => handleFieldChange('Company', CompanyRef)}
              style={fieldErrors.Company ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.Company && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.Company}</span>}
            
            <input 
              type="text" 
              placeholder="Street Address*" 
              required 
              ref={streetRef}  
              className={styles.input}
              onBlur={() => handleFieldChange('Street', streetRef)}
              style={fieldErrors.Street ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.Street && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.Street}</span>}
            
            <input 
              type="text" 
              placeholder="Apartment, floor, etc. (optional)" 
              ref={apartmenyRef} 
              required 
              className={styles.input}
              onBlur={() => handleFieldChange('Apartment', apartmenyRef)}
              style={fieldErrors.Apartment ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.Apartment && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.Apartment}</span>}
            
            <input 
              type="text" 
              placeholder="Town/City*" 
              required  
              ref={cityRef} 
              className={styles.input}
              onBlur={() => handleFieldChange('City', cityRef)}
              style={fieldErrors.City ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.City && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.City}</span>}
            
            <input 
              type="tel" 
              placeholder="Phone Number*" 
              required 
              ref={phoneNumRef}  
              className={styles.input}
              onBlur={() => handleFieldChange('phone', phoneNumRef)}
              style={fieldErrors.phone ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.phone && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.phone}</span>}
            
            <input 
              type="email" 
              placeholder="Email Address*" 
              required 
              ref={emailRef} 
              className={styles.input}
              onBlur={() => handleFieldChange('email', emailRef)}
              style={fieldErrors.email ? {borderColor: '#d33'} : {}}
            />
            {fieldErrors.email && <span style={{color: '#d33', fontSize: '12px'}}>{fieldErrors.email}</span>}
            
            <label className={styles.checkbox}>
              <input type="checkbox" />
              Save this information for faster check-out next time
            </label>
          </form>
        </div>

        
        <div className={styles.orderSummary}>
          <h3 className={styles.summaryTitle}>
            Order Summary
          </h3>
          
          {items.map((cartItem) => (
            <div key={cartItem.id} className={styles.orderItem}>
              <img 
                src={cartItem.item.image} 
                alt={cartItem.item.title} 
                className={styles.itemImage}
              />
              <span className={styles.itemTitle}>
                {cartItem.item.title}
                <div className={styles.quantityText}>
                  Qty: {cartItem.quantity}
                </div>
              </span>
              <span className={styles.price}>
                ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <hr className={styles.divider} />

          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span className={styles.freeShipping}>Free</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className={styles.paymentMethod}>
            <label className={styles.paymentLabel}>
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Bank Transfer
              <div className={styles.paymentImages}>
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="MasterCard" />
              </div>
            </label>
          </div>

          <div className={styles.paymentMethod}>
            <label className={styles.paymentLabel}>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash on Delivery
            </label>
          </div>

          <div className={styles.couponContainer}>
            <input 
              type="text" 
              placeholder="Coupon Code" 
              className={styles.couponInput}
            />
            <button className={styles.button}>
              Apply Coupon
            </button>
          </div>

          <button 
            className={styles.placeOrderButton}
            type='submit' 
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.fallback}>
        <h1 className={styles.fallbackHeading}>No Items Added</h1>
      </div>
    );
  }
}