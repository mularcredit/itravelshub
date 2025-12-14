import React from "react";

const PartnersSection = () => {
    const partners = [
        {
            name: "M-PESA",
            logo: "/assets/img/home1/icon/partners/M-PESA_LOGO-01.svg.png",
        },
        {
            name: "Visa",
            logo: "/assets/img/home1/icon/partners/Visa-Symbol.png",
        },
        {
            name: "Mastercard",
            logo: "/assets/img/home1/icon/partners/mastercard_logo-freelogovectors.net_-640x474.png",
        },
        {
            name: "CapitalPay",
            logo: "/assets/img/home1/icon/partners/imgi_1_logo-capitalpay.png",
        },
        {
            name: "Partner",
            logo: "/assets/img/home1/icon/partners/butterdaily - 2025-12-09T222239.986.svg",
        },
    ];

    return (
        <div className="partners-section home2-gradient-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-title text-center">
                            <h2>Our Trusted Partners</h2>
                            <p>
                                We collaborate with leading payment providers and service partners to ensure
                                secure, convenient, and reliable transactions for all your travel bookings.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center g-4">
                    {partners.map((partner, index) => (
                        <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                            <div className="partner-card">
                                <div className="partner-logo">
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;
