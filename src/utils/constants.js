import { Colors } from '../styles/theme';

export const isDev = process.env.ENV !== "production";

export const AUTH_USER_TYPE = "Consumer";

export const FrameWidth = 390;
export const FrameHeight = 800;
export const HeaderHeight = 80;
export const FooterHeight = 110;
export const OpenerWidth = 50;
export const OpenerHeight = 50;
export const PopperBottom = 50 + 5;
export const IFrameBottom = 30;
export const IFrameRight = 30;
export const IFrameMarginTop = 30;
export const IFrameMarginLeft = 30;

export const AppState = {
  None: 'None',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Home: 'Home',
  Scan: 'Scan',
  Perks: 'Perks',
  Profile: 'Profile'
};

export const FormState = {
  InitWithWalkthrought: 'InitWithWalkthrought',
  InitWithoutWalkthrought: 'InitWithoutWalkthrought',
  WalkthroughtSignUp: 'WalkthroughtSignUp',
  Login: 'Login',
  EmailLogin: 'EmailLogin',
  Register: 'Register',
  Forget: 'Forget',
  Reset: 'Reset',
  Verify: 'Verify',
  OTPCodeVerify: 'OTPCodeVerify'
}

export const PageTabs = {
  home: { id: 'Home', label: 'Vault', background: Colors.white },
  // scan: { id: 'Scan', label: 'Redeem', background: Colors.netural_50 },
  wishlist: {
    id: 'Perks',
    label: 'Benefits',
    background: Colors.neutral_100,
  },
  profile: { id: 'Profile', label: 'Profile', background: Colors.netural_50 },
};

export const EventTypes = {
  ShowPopup: "vaultik-show-popup",
  UserEmail: "vaultik-user-email",
};

export const Currencies = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  AMD: "֏",
  AZN: "₼",
  RUB: "₽",
  CHF: "Fr.",
};

export const ClaimStatus = {
  CREATED: { label: "Claim Submitted", color: "black", bgcolor: "var(--color-neutral-200)" },
  PENDING: { label: "Claim Pending", color: "black", bgcolor: "var(--color-neutral-200)" },
  REPORTED: { label: "Claim In Progress", color: "black", bgcolor: "var(--color-neutral-200)" },
  REVIEWED: { label: "Claim Reviewed", color: "black", bgcolor: "var(--color-neutral-200)" },
  REJECTED: { label: "Claim Rejected", color: "black", bgcolor: "var(--color-neutral-200)" },
  APPROVED: { label: "Claim Approved", color: "black", bgcolor: "var(--color-neutral-200)" },
};

export const URLS = {
  TermsAndConditions: "https://www.vaultik.com/terms-and-conditions",
  PrivacyPolicy: "https://www.vaultik.com/privacy-policy"
};

export const PopperPosition = {
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
};

export const ErrorCode = {
  INFO_2FA_ENABLED: 0x01,
  INFO_SENT_VERIFICATION_EMAIL: 0x02,
  ERROR_NOT_REGISTERED_EMAIL: 0x10,
  ERROR_NOT_VERIFIED_EMAIL: 0x11,
  ERROR_WRONG_CREDENTIALS: 0x12,
  ERROR_INVALID_EMAIL: 0x13,
  ERROR_ALREADY_EXISTS_EMAIL: 0x14,
  ERROR_INVALID_RESET_PASSWORD_TOKEN: 0x15,
  ERROR_EXPIRED_RESET_PASSWORD_TOKEN: 0x16,
  ERROR_INVALID_RESET_PASSWORD_USER: 0x17,
  ERROR_INVALID_EMAIL_VERIFICATION_TOKEN: 0x18,
  ERROR_EXPIRED_EMAIL_VERIFICATION_TOKEN: 0x19,
  ERROR_INVALID_EMAIL_VERIFICATION_USER: 0x1A,
  ERROR_INVALID_2FA_CODE: 0x1B,
  ERROR_EXPIRED_2FA_CODE: 0x1C,
  ERROR_NOT_MATCH_PASSWORD: 0x1D,
  ERROR_PASSWORD_IS_EMPTY: 0x1E,
  ERROR_NOT_FOUND_BRAND: 0x1F,
  ERROR_REDEEM_DPP_REQUIRED: 0x20,
  ERROR_REDEEM_CODE_UPCOMING: 0x21,
  ERROR_INVALID_DPP: 0x22,
  ERROR_DP_NOT_BELONGS_TO_CONSUMER: 0x23,
  ERROR_DP_ALREADY_REDEEMED: 0x24,
  ERROR_DP_MINTING_NFT: 0x25,
  ERROR_EXCEED_CLAIM_FILE_SIZE: 0x26,
  ERROR_INVALID_REDEEM_CODE: 0x27,
  ERROR_ALREADY_USED_REDEEM_CODE: 0x28,
  ERROR_NOT_FOUND_INSURANCE: 0x29,
  ERROR_AVATA_CONFIRM: 0x2A,
  ERROR_AVATA_PROPOSAL: 0x2B,
  ERROR_AVATA_UPLOAD_CLAIM: 0x2C,
  ERROR_AVATA_AUTH_NONCE: 0x2D,
  ERROR_AVATA_AUTH_AUTHENTICATE: 0x2E,
  ERROR_AVATA_CREATE_CLAIM: 0x2F,
  ERROR_AVATA_GET_CLAIM_STATUS: 0x30,
  ERROR_AVATA_NOT_FOUND_CLAIM: 0x31,
};

export const CertifiableItemType = {
  CATALOGUE_PRODUCT: "CATALOGUE_PRODUCT",
  UNIQUE_ITEM:"UNIQUE_ITEM"
};