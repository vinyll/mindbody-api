import {MindbodyAPIClient} from "../http/MindbodyAPIClient.ts"
import {RequestArgsGet, RequestArgsGetOptionalParams, RequestArgsPost} from "../http/types/RequestArgs.ts"
import {QueryParams} from "../http/types/QueryParams.ts"
import {PaginatedResponse} from "../http/types/PaginatedResponse.ts"
import {Contracts} from "./types/Contract.ts"
import {CustomPaymentMethod} from "./types/CustomPaymentMethod.ts"
import {GiftCardBalance, GiftCards} from "./types/GiftCard.ts"
import {Packages} from "./types/Package.ts"
import {Products, ProductsInventory} from "./types/Product.ts"
import {Sales} from "./types/Sale.ts"
import {Services} from "./types/Service.ts"
import {Transactions} from "./types/Transaction.ts"
import {
  PackageItemMetadata,
  ProductItemMetadata,
  ServiceItemMetadata,
  TipItemMetadata
} from "./types/ShoppingCartItemMetadata.ts"
import {Resource} from "./types/Resource.ts"
import {
  CashPaymentItemMetadata, CheckPaymentItemMetadata,
  CompPaymentItemMetadata,
  CreditCardPaymentItemMetadata, CustomPaymentItemMetadata,
  DebitPaymentItemMetadata,
  DirectDebitPaymentItemMetadata,
  EncryptedTrackDataPaymentItemMetadata, GiftCardPaymentItemMetadata,
  PackagePaymentItemMetadata,
  StoredCardPaymentItemMetadata,
  TipPaymentItemMetadata,
  TrackDataPaymentItemMetadata
} from "./types/PaymentItemMetadata.ts"
import {ShoppingCart} from "./types/ShoppingCart.ts"
import {PurchaseAccountCredit} from "./types/PurchaseAccountCredit.ts"
import {PurchaseContract} from "./types/PurchaseContract.ts"

const MINDBODY = MindbodyAPIClient.get();

// ========================
// GET /sale/{endpoint}
// ========================

/**
 * Gets a list of card types that the site accepts. You can also use GET Sites
 * to return the Site object, which contains individual accepted card types for requested sites.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-accepted-card-types
 */
async function getAcceptedCardsTypes(
  args: RequestArgsGetOptionalParams<never>,
): Promise<string[]> {
  return await MINDBODY.get('/sale/acceptedcardtypes', args);
}

export type GetContractsQueryParams = QueryParams<{
  ContractIds?: number[];
  SoldOnline?: boolean;
  LocationId?: number;
  ConsumerId?: number;
}>;

/**
 * Returns the contracts and autopay options that are available on a
 * location-by-location basis. Depending on the configurations established by
 * the site, this endpoint returns options that can be used to sign up clients
 * for recurring payments for services offered by the business.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-contracts
 */
async function getContracts(
  args: RequestArgsGetOptionalParams<GetContractsQueryParams>,
): Promise<PaginatedResponse<Contracts>> {
  return await MINDBODY.getPaginated('/sale/contracts', {
    ...args,
    objectIndexKey: 'Contracts',
  });
}

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-custom-payment-methods
 */
async function getCustomPaymentMethods(
  args: RequestArgsGetOptionalParams<never>,
): Promise<CustomPaymentMethod> {
  return await MINDBODY.get('/sale/custompaymentmethods', args);
}

export type GetGiftCardBalanceQueryParams = QueryParams<{
  barcodeId: string;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-gift-card-balance
 */
async function getGiftCardBalance(
  args: RequestArgsGet<GetGiftCardBalanceQueryParams>,
): Promise<GiftCardBalance> {
  return await MINDBODY.get('/sale/giftcardbalance', args);
}

export type GetGiftCardsQueryParams = QueryParams<{
  Ids?: number[];
  LocationId?: number;
  SoldOnline?: boolean;
  IncludeCustomLayouts?: boolean;
}>;

/**
 * Returns information about gift cards that can be purchased.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-gift-cards
 */
async function getGiftCards(
  args: RequestArgsGet<GetGiftCardsQueryParams>,
): Promise<PaginatedResponse<GiftCards>> {
  return await MINDBODY.getPaginated('/sale/giftcards', {
    ...args,
    objectIndexKey: 'GiftCards',
  });
}

export type GetPackagesQueryParams = QueryParams<{
  Ids?: number[];
  LocationId?: number;
  SoldOnline?: boolean;
  IncludeCustomLayouts?: boolean;
}>;

/**
 * A package is typically used to combine multiple services and/or products into
 * a single offering. Staff members can check out multiple appointments while
 * selling the package, and can discount the items included. For example, a spa
 * might bundle a massage, a pedicure, a manicure, a facial, and a few
 * selected beauty products into a package.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-packages
 */
async function getPackages(
  args: RequestArgsGetOptionalParams<GetPackagesQueryParams>,
): Promise<PaginatedResponse<Packages>> {
  return await MINDBODY.getPaginated('/sale/packages', {
    ...args,
    objectIndexKey: 'Packages',
  });
}

export type GetProductsQueryParams = QueryParams<{
  ProductIds?: string[];
  SearchText?: string;
  CategoryIds?: number[];
  SubCategoryIds?: number[];
  SellOnline?: boolean;
  LocationId?: number;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-products
 */
async function getProducts(
  args: RequestArgsGetOptionalParams<GetProductsQueryParams>,
): Promise<PaginatedResponse<Products>> {
  return await MINDBODY.getPaginated('/sale/products', {
    ...args,
    objectIndexKey: 'Products',
  });
}

export type GetProductsInventoryQueryParams = QueryParams<{
  ProductIds?: number[];
  LocationIds?: number[];
  BarcodeIds?: string[];
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-products-inventory
 */
async function getProductsInventory(
  args: RequestArgsGetOptionalParams<GetProductsInventoryQueryParams>,
): Promise<PaginatedResponse<ProductsInventory>> {
  return await MINDBODY.getPaginated('/sale/productsinventory', {
    ...args,
    objectIndexKey: 'ProductsInventory',
  });
}

export type GetSalesQueryParams = QueryParams<{
  SaleId?: number;
  SaleStartDateTime?: string;
  SaleEndDateTime?: string;
  PaymentMethodId: number;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-sales
 */
async function getSales(
  args: RequestArgsGetOptionalParams<GetSalesQueryParams>,
): Promise<PaginatedResponse<Sales>> {
  return await MINDBODY.getPaginated('/sale/sales', {
    ...args,
    objectIndexKey: 'Sales',
  });
}

export type GetServicesQueryParams = QueryParams<{
  ProgramIds?: number[];
  SessionTypeIds?: number[];
  ServiceIds?: string[];
  ClassId?: number;
  ClassScheduleId?: number;
  SellOnline?: boolean;
  LocationId?: number;
  HideRelatedPrograms?: boolean;
  StaffId?: number;
  IncludeDiscounted?: boolean;
  IncludeSaleInContractOnly?: boolean;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-services
 */
async function getServices(
  args: RequestArgsGetOptionalParams<GetServicesQueryParams>,
): Promise<PaginatedResponse<Services>> {
  return await MINDBODY.getPaginated('/sale/services', {
    ...args,
    objectIndexKey: 'Services',
  });
}

export type GetTransactionsQueryParams = QueryParams<{
  SaleId?: number;
  TransactionId?: number;
  ClientId?: number;
  LocationId?: number;
  Status?: string;
  TransactionStartDateTime?: string;
  TransactionEndDateTime?: string;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#transaction
 */
async function getTransactions(
  args: RequestArgsGetOptionalParams<GetTransactionsQueryParams>,
): Promise<PaginatedResponse<Transactions>> {
  return await MINDBODY.getPaginated('/sale/transactions', {
    ...args,
    objectIndexKey: 'Transactions',
  });
}

// ========================
// POST /sale/{endpoint}
// ========================

export type CheckoutShoppingCartPayload = {
  ClientId: string;
  CardId?: string;
  InStore?: boolean;
  CalculateTax?: boolean;
  PromotionCode?: string;
  SendEmail?: boolean;
  LocationId?: number;
  Image?: string;
  ImageFileName?: string;
  ConsumerPresent?: boolean;
  PaymentAuthorizationCallbackUrl?: string;
  TransactionIDs?: number[];
  Test?: boolean;
  Items: {
    Id?: number;
    AppointmentIds?: number[];
    ClassIds?: number[];
    CourseIds?: number[];
    EnrollmentIds?: number[];
    Quantity: number;
    VisitIds?: number[];
    Item: {
      Type: 'Service' | 'Product' | 'Package' | 'Tip';
      Metadata:
        | ServiceItemMetadata
        | ProductItemMetadata
        | PackageItemMetadata
        | TipItemMetadata;
    };
    AppointmentBookingRequests?: {
      StaffId: number;
      LocationId: number;
      SessionTypeId: number;
      Resources: Resource[];
      StartDateTime: string;
      EndDateTime: string;
    }[];
  }[];
  Payments: {
    Type:
      | 'CreditCard'
      | 'StoredCard'
      | 'DirectDebit'
      | 'EncryptedTrackData'
      | 'TrackData'
      | 'DebitAccount'
      | 'Custom'
      | 'Comp'
      | 'Cash'
      | 'Check'
      | 'GiftCard';
    Metadata:
      | CreditCardPaymentItemMetadata
      | PackagePaymentItemMetadata
      | TipPaymentItemMetadata
      | StoredCardPaymentItemMetadata
      | DirectDebitPaymentItemMetadata
      | EncryptedTrackDataPaymentItemMetadata
      | TrackDataPaymentItemMetadata
      | DebitPaymentItemMetadata
      | CustomPaymentItemMetadata
      | CompPaymentItemMetadata
      | CashPaymentItemMetadata
      | CheckPaymentItemMetadata
      | GiftCardPaymentItemMetadata;
  }[];
};

/**
 * This endpoint provides a wide range of functionality. For example, you can use
 * it when a client purchases new pricing options, retail products, packages, and
 * tips. You can also combine purchasing a new pricing option and many other functions,
 * such as booking a client into a class, booking a new appointment for a client,
 * enrolling a client into an enrollment or course, or reconciling an unpaid, already
 * booked appointment or class. Use this call when a client purchases:
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#checkout-shopping-cart
 */
async function checkoutShoppingCart(
  args: RequestArgsPost<CheckoutShoppingCartPayload>,
): Promise<ShoppingCart> {
  return await MINDBODY.post('/sale/checkoutshoppingcart', args);
}

export type PurchaseAccountCreditPayload = {
  ClientId: string;
  LocationId?: number;
  SendEmailReceipt?: boolean;
  SalesRepId?: number;
  ConsumerPresent?: boolean;
  PaymentAuthenticationCallbackUrl?: string;
  PaymentInfo: {
    Type: string;
    Metadata:
      | CreditCardPaymentItemMetadata
      | PackagePaymentItemMetadata
      | TipPaymentItemMetadata
      | StoredCardPaymentItemMetadata
      | DirectDebitPaymentItemMetadata
      | EncryptedTrackDataPaymentItemMetadata
      | TrackDataPaymentItemMetadata
      | DebitPaymentItemMetadata
      | CustomPaymentItemMetadata
      | CompPaymentItemMetadata
      | CashPaymentItemMetadata
      | CheckPaymentItemMetadata
      | GiftCardPaymentItemMetadata;
  };
};

/**
 * Allows a client to purchase account credit from a business.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#purchase-account-credit
 */
async function purchaseAccountCredit(
  args: RequestArgsPost<PurchaseAccountCreditPayload>,
): Promise<PurchaseAccountCredit> {
  return await MINDBODY.post('/sale/purchaseaccountcredit', args);
}

export type PurchaseContractPayload = {
  ClientId: string;
  LocationId?: number;
  ContractId?: number;
  StartDate?: string;
  FirstPaymentOccurs?: 'Instant' | 'StartDate';
  ClientSignature?: string;
  PromotionCode?: string;
  UseDirectDebit?: boolean;
  SendNotifications?: boolean;
  SalesRepId?: number;
  ConsumerPresent?: boolean;
  PaymentAuthenticationCallbackUrl?: string;
  CreditCardInfo?: Omit<CreditCardPaymentItemMetadata, 'Amount'>;
  StoredCardInfo?: Omit<StoredCardPaymentItemMetadata, 'Amount'>;
};

/**
 * Allows a client to sign up for a contract or autopay using the information
 * returned from the GET Contracts endpoint. The client can pay with a new credit
 * card or with a stored credit card. The client must exist at the site specified
 * before this call is made. This endpoint allows a developer to specify whether
 * a client pays now or pays on the StartDate. If you are building a client-facing
 * experience, you should talk with the business owner to understand the owner’s
 * policies before you give clients a choice of the two payment types.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#purchase-contract
 */
async function purchaseContract(
  args: RequestArgsPost<PurchaseContractPayload>,
): Promise<PurchaseContract> {
  return await MINDBODY.post('/sale/purchasecontract', args);
}

export type PurchaseGiftCardPayload = {
  PurchaserClientId: string;
  GiftCardId: number;
  BarcodeId: string;
  SenderName: string;
  RecipientEmail?: string;
  RecipientName?: string;
  Title?: string;
  GiftMessage?: string;
  DeliveryDate?: string;
  LocationId?: string;
  SalesRepId?: number;
  SendEmailReceipt?: boolean;
  ConsumerPresent?: boolean;
  PaymentAuthenticationCallbackUrl?: string;
  Test?: boolean;
  PaymentInfo: {
    Type: string;
    Metadata:
      | CreditCardPaymentItemMetadata
      | PackagePaymentItemMetadata
      | TipPaymentItemMetadata
      | StoredCardPaymentItemMetadata
      | DirectDebitPaymentItemMetadata
      | EncryptedTrackDataPaymentItemMetadata
      | TrackDataPaymentItemMetadata
      | DebitPaymentItemMetadata
      | CustomPaymentItemMetadata
      | CompPaymentItemMetadata
      | CashPaymentItemMetadata
      | CheckPaymentItemMetadata
      | GiftCardPaymentItemMetadata;
  };
};

/**
 * Allows a client to purchase a gift card from a business in a variety of
 * designs. The card can be emailed to the recipient on a specific day, and a
 * card title and a personal message can be added.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#purchase-gift-card
 */
async function purchaseGiftCard(
  args: RequestArgsPost<PurchaseGiftCardPayload>,
): Promise<PurchaseContract> {
  return await MINDBODY.post('/sale/purchasegiftcard', args);
}

export type UpdateProductPricePayload = {
  BarcodeId: string;
  Price?: number;
  OnlinePrice?: number;
};

/**
 * This endpoint updates the retail price and an online price for a product.
 * Passing at least one of them is mandatory.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#update-product-price
 */
async function updateProductPrice(
  args: RequestArgsPost<UpdateProductPricePayload>,
): Promise<{ Product: Product }> {
  return await MINDBODY.post('/sale/updateproductprice', args);
}

export type ReturnSalePayload = {
  SaleId: number;
  ReturnReason: string;
};

/**
 * Return a comped sale for a specified sale ID in business mode. The sale is
 * returnable only if it is a sale of a service, product or gift card and it has
 * not been used. Currently, only the comp payment method is supported.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#post-return-sale
 */
async function returnSale(
  args: RequestArgsPost<ReturnSalePayload>,
): Promise<ReturnSale> {
  return await MINDBODY.post('/sale/returnsale', args);
}

export type InitializeCreditCardEntryPayload = {
  LocationId: number;
};

/**
 * This endpoint returns a Callback URL which is used to load Card Element UI with
 * the help of which user will be able to enter the card details and initiate a transaction.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#initialize-credit-card-entry
 */
async function initializeCreditCard(
  args: RequestArgsPost<InitializeCreditCardEntryPayload>,
): Promise<{ CallbackUrl: string }> {
  return await MINDBODY.post('/sale/initializecreditcardentry', args);
}

// ========================
// PUT /sale/{endpoint}
// ========================

export type UpdateProductsPayload = {
  BarcodeId: string;
  Price?: number;
  OnlinePrice?: number;
};

/**
 * This endpoint updates the retail price and an online price for products.
 * Passing at least one of them is mandatory.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#update-products
 */
async function updateProducts(
  args: RequestArgsPost<InitializeCreditCardEntryPayload>,
): Promise<Products> {
  return await MINDBODY.put('/sale/products', args);
}

export type UpdateServicesPayload = {
  BarcodeId: string;
  Price?: number;
  OnlinePrice?: number;
};

/**
 * This endpoint updates the retail price and an online price for services.
 * Passing at least one of them is mandatory.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#update-services
 */
async function updateServices(
  args: RequestArgsPost<UpdateServicesPayload>,
): Promise<Services> {
  return await MINDBODY.put('/sale/services', args);
}

export type UpdateSaleDatePayload = {
  SaleID: number;
  SaleDate: string;
};

/**
 * This endpoint updates the SaleDate and returns the details of the sale.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#update-sale-date
 */
async function updateSaleDate(
  args: RequestArgsPost<UpdateSaleDatePayload>,
): Promise<Services> {
  return await MINDBODY.put('/sale/updatesaledate', args);
}

export default {
  getAcceptedCardsTypes,
  getContracts,
  getCustomPaymentMethods,
  getGiftCardBalance,
  getGiftCards,
  getPackages,
  getProducts,
  getProductsInventory,
  getSales,
  getServices,
  getTransactions,
  checkoutShoppingCart,
  initializeCreditCard,
  purchaseAccountCredit,
  purchaseContract,
  purchaseGiftCard,
  returnSale,
  updateProducts,
  updateProductPrice,
  updateServices,
  updateSaleDate,
};
