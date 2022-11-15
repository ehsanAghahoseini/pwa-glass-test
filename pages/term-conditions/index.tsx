import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

interface IIndexProps {

}

const Index: NextPage<IIndexProps> = (props) => {

    return (
        <div className=' flex flex-col w-full pt-10 pb-14 min-h-[calc(100vh-300px)] max-w-screen-md mx-auto px-6'>
            <h1 className=' text-gr-300 mt-6 text-xl cursor-pointer mb-10'>
                Conditions of Use & Sale
            </h1>
            <div className=' flex flex-col py-6 '>
                <h2>
                    Welcome to Optic4Less
                </h2>
                <p className='text-justify'>
                    Optic4Less provides website features and other products and services to you when you visit or shop at
                    Optic4Less (the "Website"), use Optic4Less products, or services, use Optic4Less applications for mobile,
                    or use software provided by Optic4Less in connection with any of the foregoing (collectively "Optic4Less
                    Services"). “Affiliate” means, with respect to a particular person, any entity that directly or indirectly
                    controls, is controlled by, or is under common control with such person. Please see our Privacy Policy to
                    understand how we collect and process your personal information through Optic4Less Services.
                    Optic4Less provides the Optic4Less Services and sells our products to you subject to the conditions set out
                    on this page. Optic4Less is the trading name for Optic4Less.

                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <li>Conditions of Use</li>
                <li>Conditions of Sale</li>
            </div>

            <div className=' flex flex-col py-6 '>

                <p>Conditions of Use</p>
                <p className='text-justify'>Please read these conditions carefully before using Optic4Less Services. By using Optic4Less Services,
                    you signify your agreement to be bound by these conditions. We offer a wide range of Optic4Less
                    Services, and sometimes additional terms may apply. When you use an Optic4Less Service (for example
                    Your Profile or Optic4Less applications for mobile), you will also be subject to the terms, guidelines and
                    conditions applicable to that Optic4Less Service ("Service Terms"). If these Conditions of Use are
                    inconsistent with the Service Terms, those Service Terms will control.
                </p>
            </div>

            <div className=' flex flex-col py-3 font-bold '>
                <a href='https://www.amazon.ae/report/infringement/signin'
                /* target={'_blank'}*/
                ><li>Notice and Procedure for Making Claims of Right Infringements</li></a>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>1. ELECTRONIC COMMUNICATIONS</p>
                <p className='text-justify'>
                    When you use any Optic4Less Service or send e-mails to us, you are communicating with us electronically.
                    We will communicate with you electronically in a variety of ways, such as by e-mail, text, in-app push
                    notices or by posting e-mail messages or communications on the Website or through the other Optic4Less
                    Services, such as our Message Center. For contractual purposes, you agree that all agreements, notices,
                    disclosures and other communications that we provide you electronically satisfy any legal requirement
                    that such communications be in writing, unless mandatory applicable laws specifically require a different
                    form of communication.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>2. RECOMMENDATIONS AND PERSONALIZATION</p>
                <p className='text-justify'>
                    As part of the Optic4Less Services, we will recommend features, products, and services that might be of
                    interest to you, identify your preferences, and personalize your experience.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>3. COPYRIGHT, AUTHORS' RIGHTS AND DATABASE RIGHTS</p>
                <p className='text-justify'>
                    All content included in or made available through any Optic4Less Service, such as text, graphics, logos,
                    button icons, images, audio clips, digital downloads and data compilations is the property of Optic4Less or
                    its content suppliers and is protected by local and international copyright, authors' rights and database
                    right laws. The compilation of all content included in or made available through any Optic4Less Service is
                    the exclusive property of Optic4Less and is protected by local and international copyright and database
                    right laws.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    You may not extract and/or re-utilize parts of the content of any Optic4Less Service without our express
                    written consent. In particular, you may not utilize any data mining, robots, or similar data gathering and
                    extraction tools to extract (whether once or many times) for re-utilization any substantial parts of the content of any Optic4Less Service, without our express written consent. You may also not create and/or
                    publish your own database that features substantial parts of any Optic4Less Service (e.g. our prices and
                    product listings) without our express written consent.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>4. TRADEMARKS</p>
                <p className='text-justify'>
                    In addition graphics, logos, page headers, button icons, scripts, and service names included in or made
                    available through any Optic4Less Service are trademarks or trade image of Optic4Less. Optic4Less's
                    trademarks and trade dress may not be used in connection with any product or service that is not
                    Optic4Less's, in any manner that is likely to cause confusion among customers or in any manner that
                    disparages or discredits Optic4Less. All other trademarks not owned by Optic4Less that appear in any
                    Optic4Less Service are the property of their respective owners, who may or may not be affiliated with,
                    connected to, or sponsored by Optic4Less.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>5. LICENCE AND ACCESS</p>
                <p className='text-justify'>
                    Subject to your compliance with these Conditions of Use and applicable Service Terms and your payment
                    of any applicable fees, Optic4Less or its content providers grant you a limited, non-exclusive, nontransferable, non-sublicensable license to access and make personal and non-commercial use of the
                    Optic4Less Services. This license does not include any resale or commercial use of any Optic4Less Service
                    or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of
                    any Optic4Less Service or its contents; any downloading or copying of account information for the benefit
                    of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    All rights not expressly granted to you in these Conditions of Use or any Service Terms are reserved and
                    retained by Optic4Less or its licensors, suppliers, publishers, rights holders, or other content providers. No
                    Optic4Less Service, nor any part of any Optic4Less Service, may be reproduced, duplicated, copied, sold,
                    resold, visited, or otherwise exploited for any commercial purpose without our express written consent.
                    You may not frame or use framing techniques to enclose any trademark, logo or other proprietary
                    information (including images, text, page layout, or form) of Optic4Less without our express written
                    consent. You may not use any meta tags or any other "hidden text" utilizing Optic4Less's names or
                    trademarks without our express written consent.
                    You may not misuse the Optic4Less Services. You may use the Optic4Less Services only as permitted by
                    law. The licenses granted by Optic4Less terminate if you do not comply with these Conditions of Use or
                    any Service Terms
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>6. YOUR ACCOUNT</p>
                <p className='text-justify'>
                    You may need your own Optic4Less account to use certain Optic4Less Services, and you may be required
                    to be logged into the account and have a valid payment method associated with it.
                    If there is a problem charging your selected payment method we may charge any other valid payment
                    method associated with your account.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    If you use any Optic4Less Service you are responsible for maintaining the confidentiality of your account
                    and password and for restricting access to your account, and to the extent permitted by applicable law you
                    agree to accept responsibility for all activities that occur under your account or password. You should take
                    all necessary steps to ensure that the password is kept confidential and secure and should inform us
                    immediately if you have any reason to believe that your password has become known to anyone else, or if
                    the password is being, or is likely to be used in an unauthorized manner. You are responsible for ensuring
                    that the details you provide us with are correct and complete, and for informing us of any changes to the
                    information you have provided.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    You must not use any Optic4Less Service: (i) in any way that causes, or is likely to cause, any Optic4Less
                    Service, or any access to it to be interrupted, damaged or impaired in any way, or (ii) for fraudulent
                    purposes, or in connection with a criminal offence or other unlawful activity, or (iii) to cause annoyance,
                    inconvenience or anxiety.
                    We reserve the right to refuse service, terminate accounts or remove or edit content if you are in breach of
                    applicable laws, these Conditions of Use or any other applicable terms and conditions, guidelines or
                    policies.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>7. REVIEWS, COMMENTS, COMMUNICATIONS AND OTHER CONTENT</p>
                <p className='text-justify'>
                    You may post reviews, comments and other content; and other communications; and submit suggestions,
                    ideas, comments, questions or other information, as long as the content is not illegal, obscene, abusive,
                    threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise
                    injurious to third parties or objectionable and does not consist of or contain software viruses, political
                    campaigning, commercial solicitation, chain letters, mass mailings or any form of "spam". You may not use
                    a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or
                    other content. We reserve the right to remove or edit such content. If you believe that any content on or
                    advertised for sale on any Optic4Less Service contains a defamatory statement, or that your intellectual
                    property rights are being infringed by an item or information on any Optic4Less Service.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    If you post customer reviews, comments, customer questions or answers, or other content generated by
                    you for display on the Website (including any images, video or audio, all together "content", you grant
                    Optic4Less a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use,
                    reproduce, modify, adapt, publish, perform, create derivative works from, distribute, make available,
                    translate, and modify such content throughout the world in any media. You grant Optic4Less and
                    Optic4Less’s sublicenees the right to use the name that you submit in connection with such content.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    You represent and warrant that you own or otherwise control all of the rights to the content that you post;
                    that the content is accurate; and that use of the content you supply does not breach any applicable policies
                    or guidelines and will not cause injury to any person or entity (including that the content or material is not
                    defamatory). You agree to indemnify Optic4Less for all claims brought by a third party against Optic4Less
                    arising out of or in connection with the content and material you supply except to the extent that any
                    liability arises from our failure to properly remove the content when it is notified of the illegal nature of the
                    content arising out of or on the grounds of, or originating from the content that you have communicated
                    to us. Optic4Less has the right but not the obligation to monitor and edit or remove any activity or
                    content. Optic4Less takes no responsibility and assumes no liability for any content posted by you or any
                    third party.

                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>8. INTELLECTUAL PROPERTY CLAIMS</p>
                <p className='text-justify'>
                    Optic4Less respects the intellectual property of others.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>10. OPTIC4LESS SOFTWARE TERMS</p>
                <p className='text-justify'>
                    In addition to these Conditions of Use, the terms found apply to any software (including any updates or
                    upgrades to the software and any related documentation) that we make available to you from time to time
                    for your use in connection with Optic4Less Services (the "Optic4Less Software").
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>11. SANCTIONS AND EXPORT POLICY</p>
                <p className='text-justify'>
                    You may not use any Optic4Less Service if you are the subject of U.S. sanctions or of sanctions consistent
                    with U.S. law imposed by the governments of the country where you are using Optic4Less Services. You
                    must comply with all U.S. or other export and re-export restrictions that may apply to goods, software
                    (including Optic4Less Software), technology, and services. Nothing in these Conditions of Use shall, or
                    shall be interpreted or construed to, induce or require Optic4Less or you to act in any manner (including
                    taking or failing to take any actions in connection with a transaction) which is inconsistent with or
                    penalized under any applicable U.S. laws, regulations, rules, or requirements.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>12. OTHER BUSINESS</p>
                <p className='text-justify'>
                    Parties other than Optic4Less operate stores, provide services, or sell product lines on this Website. In
                    addition, we provide links to the sites of affiliated companies and certain other businesses. We are not responsible for physically examining or evaluating, and we do not warrant the offerings of, any of these
                    businesses or individuals or the content of their websites. Optic4Less does not assume any responsibility
                    or liability for the actions, genuiness of the product, and content of all of these or any other third parties.
                    When a third party is involved in your transactions, we may share your information related to those
                    transactions with that third party. You should carefully review their privacy statements and other
                    conditions of use.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>13. OPTIC4LESS'S ROLE</p>
                <p className='text-justify'>
                    Optic4Less allows third party sellers to list and sell their products at Optic4Less.ae. In each such case this is
                    indicated on the respective product detail page. While Optic4Less helps facilitate transactions that are
                    carried out on the Optic4Less marketplace, Optic4Less is neither the buyer nor the seller of the seller's
                    items. Optic4Less provides a venue for sellers and buyers to negotiate and complete transactions.
                    Accordingly, the contract formed at the completion of a sale for these third party products is solely
                    between buyer and seller. Optic4Less is not a party to this contract nor assumes any responsibility arising
                    out of or in connection with it nor is it the seller's agent. The seller is responsible for the sale of the
                    products and for dealing with any buyer claims or any other issue arising out of or in connection with the
                    contract between the buyer and seller.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>14. OUR LIABILITY</p>
                <p className='text-justify'>
                    We will do our utmost to ensure that availability of the Optic4Less Services will be uninterrupted and that
                    transmissions will be error-free. However, due to the nature of the internet, this cannot be guaranteed.
                    Also, your access to Optic4Less Services may also be occasionally suspended or restricted to allow for
                    repairs, maintenance, or the introduction of new facilities or services. We will attempt to limit the
                    frequency and duration of any such suspension or restriction.
                    Optic4Less will not be responsible for (i) losses that were not caused by any breach on our part, or (ii) any
                    business loss (including loss of profits, revenue, contracts, anticipated savings, data, goodwill or wasted
                    expenditure), or (iii) any indirect or consequential losses that were not foreseeable to both you and us
                    when you commenced using the Optic4Less Services.
                    We will not be held responsible for any delay or failure to comply with our obligations under these
                    conditions if the delay or failure arises from any cause which is beyond our reasonable control. This
                    condition does not affect your legal right to have goods sent or services provided within a reasonable time
                    or to receive a refund if goods or services ordered cannot be supplied within a reasonable time owing to a
                    cause beyond our reasonable control.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>15. APPLICABLE LAW</p>
                <p className='text-justify'>
                    These conditions are governed by and construed in accordance with the laws of the Dubai International
                    Finance Center (“DIFC”). If any dispute, claim, difference or controversy arising out of, relating to or having
                    any connection with these conditions, including as it may relate in any way to your use of any Optic4Less
                    Service, or to any products or services sold or distributed by Optic4Less or through Optic4Less.ae, or the
                    existence, validity, interpretation, performance, breach or termination and/or any dispute relating to any
                    non-contractual obligations arising out of or in connection with them (for the purpose of this section, a
                    “Dispute”) qualifies for determination through the DIFC Small Claims Tribunal (“SCT”), then the SCT shall
                    have exclusive jurisdiction to settle any such Dispute. For Disputes that do not qualify for determination
                    through the SCT, the courts of the DIFC shall have exclusive jurisdiction to settle such Dispute and each
                    party submits to the exclusive jurisdiction of the courts of the DIFC. For the purposes of this section, you
                    waive any objection to either the courts of the DIFC orthe SCT, as applicable, on the grounds that either of
                    them is an inconvenient or inappropriate forum to settle any Dispute.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>16. ALTERATIONS TO SERVICE OR AMENDMENTS TO THE CONDITIONS OF USE</p>
                <p className='text-justify'>
                    We reserve the right to make changes to any Optic4Less Services, policies, terms and conditions including
                    these Conditions of Use, and Service Terms at any time. You will be subject to the terms and conditions,
                    policies and Conditions of Use in force at the time that you use the Optic4Less Services. If any of these
                    Conditions of Use is deemed invalid, void, or for any reason unenforceable, that condition will be deemed
                    severable and will not affect the validity and enforceability of any remaining condition.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>17. WAIVER</p>
                <p className='text-justify'>
                    If you breach these Conditions of Use and we take no action, we will still be entitled to use our rights and
                    remedies in any other situation where you breach these Conditions of Use.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>18. CHILDREN</p>
                <p className='text-justify'>
                    We do not sell products for purchase by children. We sell children's products for purchase by adults. If you
                    are under 21 you may use the Optic4Less Services only with the involvement of a parent or guardian.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>19. OUR CONTACT DETAILS</p>
                <p className='text-justify'>
                    This Website is owned and maintained by Nice Optical LLC. Our contact details are:
                    Office 607, City Avenue Building, Port Saeed - Deira, Dubai, United Arab Emirates
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>20. NOTICE AND PROCEDURE FOR MAKING CLAIMS OF RIGHT INFRINGEMENTS</p>
                <p className='text-justify'>
                    We respond expeditiously to rights owners and their agents who communicate concerns about any alleged
                    infringement. We may take certain actions, including removing information or an item, all of which are
                    taken without any admission as to liability and without prejudice to any rights, remedies or defenses, all of
                    which are expressly reserved. Furthermore, you grant to Optic4Less the right to use, reproduce, modify,
                    adapt, publish, translate, create derivative works from, and display its content throughout the world in any
                    media. This includes notifying the parties involved in the provision of the allegedly infringing content. You
                    agree to indemnify Optic4Less for all claims brought by a third party against Optic4Less arising out of or in
                    connection with the submission of a Notice Form.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>Note on Third Party Seller Listings:</p>
                <p className='text-justify'>
                    on Optic4Less.ae and are posted solely at the direction of Third Party Sellers who may be contacted via
                    their Seller Information page, accessible from any of their listings.
                </p>
            </div>

            <h1 className=' text-gr-300 mt-6 text-xl cursor-pointer mb-10'>
                ADDITIONAL Optic4Less SOFTWARE TERMS
            </h1>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>Use of the Optic4Less Software.</p>
                <p className='text-justify'>
                    you to use and enjoy the Optic4Less Services as provided by Optic4Less, and as permitted by the
                    Conditions of Use, these Software Terms and any Service Terms. You may not incorporate any
                    portion of the Optic4Less Software into your own programs or compile any portion of it in
                    combination with your own programs, transfer it for use with another service, or sell, rent, lease,
                    lend, loan, distribute or sub-license the Optic4Less Software or otherwise assign any rights to the
                    Optic4Less Software in whole or in part. You may not use the Optic4Less Software for any illegal
                    purpose. We may cease providing any Optic4Less Software and we may terminate your right to use
                    any Optic4Less Software at any time. Your rights to use the Optic4Less Software will automatically
                    terminate without notice from us if you fail to comply with any of these Software Terms, the
                    Conditions of Use or any other Service Terms. Additional third party terms contained within or
                    distributed with certain Optic4Less Software that are specifically identified in related
                    documentation may apply to that Optic4Less Software (or software incorporated with the
                    Optic4Less Software) and will govern the use of such software in the event of a conflict with these
                    Conditions of Use. All software used in any Optic4Less Service is the property of Optic4Less or its
                    software suppliers and protected by local and international copyright laws.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>Use of Third Party Services.</p>
                <p className='text-justify'>
                    When you use the Optic4Less Software, you may also be using the
                    services of one or more third parties, such as a wireless carrier or a mobile platform provider. Your
                    use of these third party services may be subject to the separate policies, terms of use, and fees of
                    these third parties.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>No Reverse Engineering.</p>
                <p className='text-justify'>
                    Unless explicitly permitted under applicable mandatory law, you may
                    not, and you will not encourage, assist or authorize any other person to copy, modify, reverse engineer, decompile or disassemble, or otherwise tamper with, the Optic4Less Software, whether
                    in whole or in part, or create any derivative works from or of the Optic4Less Software.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>4. Updates.</p>
                <p className='text-justify'>
                    In order to keep the Optic4Less Software up-to-date, we may offer automatic or manual
                    updates at any time and without notice to you.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>CONDITIONS OF SALE</p>
                <p className='text-justify'>
                    These Conditions of Sale govern the sale of products by Optic4Less Affiliate, to you. For conditions
                    relating to the sale by third parties to you on Optic4Less.ae, please see Article 13 of the Conditions of Use.
                    We offer a wide range of Optic4Less Services, and sometimes additional terms may apply. When you use
                    an Optic4Less Service (for example Your Profile or Optic4Less applications for mobile), you will also be
                    subject to the terms, guidelines and conditions applicable to that Optic4Less Service ("Service Terms"). If
                    these Conditions of Sale are inconsistent with the Service Terms, those Service Terms will control.
                    Please read these conditions carefully before placing an order with Optic4Less. By placing an order with
                    Optic4Less, you signify your agreement to be bound by these conditions
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>1. OUR CONTRACT</p>
                <p className='text-justify'>
                    Optic4Less is a platform linking sellers and buyers and facilitates the purchase of eyewear /product(s).
                    When the buyer places an order to purchase a product from the seller page, Optic4Less will send you a
                    receipt for your order and containing the details of your order (the "Order Receipt E-mail”).
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    You (the buyer) consent to receive sales invoices electronically. Electronic invoices will be made available
                    in pdf format in the Your Account area of the web site. For further information about electronic invoices
                    and instructions on how to receive a paper copy please refer to our help pages.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    Optic4Less focuses on business development for end users, and prohibits sales by resellers. Sales by
                    resellers refer to behavior of customers who resell to their direct customers of products purchased from
                    Optic4Less. If Optic4Less finds out that you resell products purchased from Optic4Less, we reserve the
                    right not to allow product purchase by your account and may permanently close your account.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>2. RETURNS, REFUNDS AND TITLE</p>
                <p className='text-justify'>
                    The Seller (“Subscriber”) will be held liable for all costs related to the return of a damaged
                    item including but not limited to (i) all delivery / collection charges, (ii) refund of damaged items
                    to the customer.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>3. WARRANTY</p>
                <p className='text-justify'>
                    The retailer will provide a twelve (12)- month warranty on eligible products purchased in the United Arab
                    Emirates (the “UAE”). At the retailers discretion, this warranty obligation is limited to repair of defective
                    product or replacement of the defective part, or replacement or refund according to the price of the
                    product at the time of repair or replacement
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>4. PRICING AND AVAILABILITY</p>
                <p className='text-justify'>
                    All prices are inclusive of legally applicable VAT.
                    We list availability information for products sold by us on the Website including on each product
                    information page. Beyond what we say on that page or otherwise on the Website, we cannot be more
                    specific about availability. As we process your order, we will inform you by e-mail as soon as possible if any
                    products you order turn out to be unavailable and will refund you if you are charged for those products.

                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    Please note that unless otherwise stated on the Website, delivery estimates are just that. They are not
                    guaranteed delivery times and should not be relied upon as such.
                </p>
            </div>

            <div className=' flex flex-col py-3 '>
                <p className='text-justify'>
                    Despite our best efforts, a small number of the items in our catalogue may be mispriced. We will verify
                    pricing when processing your order. If we have made a mistake and a product's correct price is higher than
                    the price on the Website, we may either contact you before shipping to request whether you want to buy the product at the correct price or cancel your order. If a product's correct price is lower than our stated
                    price, we will charge the lower amount and send you the product.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>5. PRODUCT INFORMATION</p>
                <p className='text-justify'>
                    Unless expressly indicated otherwise, Optic4Less is not the manufacturer of the products sold on this
                    Website. While we work to ensure that product information on our Website is correct, actual product
                    packaging and materials may contain more and different information to that displayed on our Website. All
                    information about the products on our Website is provided for information purposes only.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>6. CUSTOMS</p>
                <p className='text-justify'>
                    When ordering products from Optic4Less for delivery outside of the UAE you may be subject to import
                    duties and taxes, which are levied once the package reaches the specified destination. Any additional
                    charges for customs clearance must be borne by you; we have no control over these charges. Customs
                    policies vary widely from country to country, so you should contact your local customs office for further
                    information. Additionally, please note that when ordering from Optic4Less, you are considered the
                    importer of record and must comply with all laws and regulations of the country in which you are receiving
                    the products. Your privacy is important to us and we would like our international customers to be aware
                    that cross-border deliveries are subject to opening and inspection by customs authorities.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>7. OUR LIABILITY</p>
                <p className='text-justify'>
                    Optic4Less and its Affiliates will not be responsible for (i) losses that were not caused by any breach on our
                    part, or (ii) any business loss (including loss of profits, revenue, contracts, anticipated savings, data,
                    goodwill or wasted expenditure), or (iii) any indirect or consequential losses that were not foreseeable to
                    both you and us when the contract for the sale of products by us to you was formed.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='text-justify'>
                    We will not be held responsible for any delay or failure to comply with our obligations under these
                    conditions if the delay or failure arises from any cause which is beyond our reasonable control. This
                    condition does not affect your right to have the products sent to you within a reasonable time. If the delay
                    occurs before the products are shipped, you may cancel your order at any time prior to shipping.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>8. APPLICABLE LAW</p>
                <p className='text-justify'>
                    These conditions are governed by and construed in accordance with the laws of the Dubai International
                    Finance Center (“DIFC”). If any dispute, claim, difference or controversy arising out of, relating to or having
                    any connection with these conditions, including as it may relate in any way to your use of any Optic4Less
                    Service, or to any products or services sold or distributed by Optic4Less or through Optic4Less.ae, or the
                    existence, validity, interpretation, performance, breach or termination and/or any dispute relating to any
                    non-contractual obligations arising out of or in connection with them (for the purpose of this section, a
                    “Dispute”) qualifies for determination through the DIFC Small Claims Tribunal (“SCT”), then the SCT shall
                    have exclusive jurisdiction to settle any such Dispute. For Disputes that do not qualify for determination
                    through the SCT, the courts of the DIFC shall have exclusive jurisdiction to settle such Dispute and each
                    party submits to the exclusive jurisdiction of the courts of the DIFC. For the purposes of this section, you
                    waive any objection to either the courts of the DIFC orthe SCT, as applicable, on the grounds that either of
                    them is an inconvenient or inappropriate forum to settle any Dispute.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>9. AMENDMENTS TO THE CONDITIONS OF SALE</p>
                <p className='text-justify'>
                    We reserve the right to make changes to our Website, policies, and terms and conditions, including these
                    Conditions of Sale at any time. You will be subject to the terms and conditions, policies and Conditions of
                    Sale in force at the time that you order products from us, unless any change to those terms and conditions,
                    policies or these Conditions of Sale is required to be made by law or government authority (in which case it
                    may apply to orders previously placed by you). If any of these Conditions of Sale is deemed invalid, void, or
                    for any reason unenforceable, that condition will be deemed severable and will not affect the validity and
                    enforceability of any remaining condition
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>10. WAIVER</p>
                <p className='text-justify'>
                    If you breach these Conditions of Sale and we take no action, we will still be entitled to use our rights and
                    remedies in any other situation where you breach these Conditions of Sale.
                </p>
            </div>

            <div className=' flex flex-col py-6 '>
                <p className='font-bold'>11. CHILDREN</p>
                <p className='text-justify'>
                    We do not sell products for purchase by children. We sell children's products for purchase by adults. If you
                    are under 15 you may only use Optic4Less.ae with the involvement of a parent or guardian.
                </p>
            </div>

        </div>
    );
};

export default Index;
