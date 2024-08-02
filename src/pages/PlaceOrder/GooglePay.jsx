import GooglePayButton from "@google-pay/button-react";
import React from 'react';

const GooglePay = ({ total }) => {
    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId'
                            }
                        }
                    }
                ],
                merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'DEMO Merchant'
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: total,
                    currencyCode: 'INR',
                    countryCode: 'IN'
                }
            }}
            buttonColor="black"
            buttonType="buy"
            className="google-pay-button"
        />
    );
}

export default GooglePay;
