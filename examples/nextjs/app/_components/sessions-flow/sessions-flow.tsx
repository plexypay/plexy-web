"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
    PlexyCheckout,
    Dropin,
    Card,
    CashAppPay,
    GooglePay,
    PayPal,
    UIElement,
    PlexyCheckoutError,
} from "@plexy/plexy-web";
import "@plexy/plexy-web/styles/plexy.css";
import type {
    PaymentFailedData,
    PaymentCompletedData,
    CoreConfiguration,
    DropinConfiguration,
} from "@plexy/plexy-web";
import {
    DEFAULT_AMOUNT,
    DEFAULT_COUNTRY,
    DEFAULT_LOCALE,
} from "@/app/_utils/constants";
import makeSessionsSetupCall from "../../_utils/makeSessionsSetupCall";
import { parseAmount } from "@/app/_utils/amount-utils";

export default function SessionsFlow() {
    const dropinRef = useRef<HTMLDivElement>(null);
    const isPlexyWebInitialized = useRef<boolean>(false);
    const searchParams = useSearchParams();

    const loadPlexy = useCallback(async () => {
        const countryCode = searchParams.get("countryCode") || DEFAULT_COUNTRY;
        const locale = searchParams.get("shopperLocale") || DEFAULT_LOCALE;
        const amount = parseAmount(
            searchParams.get("amount") || DEFAULT_AMOUNT,
            countryCode,
        );

        const session = await makeSessionsSetupCall({
            countryCode,
            amount,
            shopperLocale: locale,
        });

        const options: CoreConfiguration = {
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
            session: {
                id: session.id,
                sessionData: session.sessionData,
            },
            countryCode,
            amount,
            locale,
            environment: "test",
            analytics: {
                enabled: false,
            },
            onError(error: PlexyCheckoutError) {
                console.error("Something went wrong", error);
            },
            onPaymentCompleted(data: PaymentCompletedData, element: UIElement) {
                console.log(data, element);
            },
            onPaymentFailed(data: PaymentFailedData, element: UIElement) {
                console.log(data, element);
            },
        };

        const checkout = await PlexyCheckout(options);

        const dropinConfiguration: DropinConfiguration = {
            paymentMethodsConfiguration: {
                card: {
                    _disableClickToPay: true,
                },
            },
            paymentMethodComponents: [Card, PayPal, CashAppPay, GooglePay],
        };

        if (dropinRef.current) {
            new Dropin(checkout, dropinConfiguration).mount(dropinRef.current);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!isPlexyWebInitialized.current) {
            isPlexyWebInitialized.current = true;
            void loadPlexy();
        }
    }, [loadPlexy]);

    return <div ref={dropinRef} id="dropin"></div>;
}
