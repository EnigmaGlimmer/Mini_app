import { Colors } from "./theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
   --color-primary: #613DC1;
   --color-tertiary: #242124;
   --color-primary-200: #EFEEF4;
   --color-primary-300: #9E98BB;
   --color-primary-600: #5E548E;
   --color-primary-800: #3730A3;
   --color-primary-900: #312E81;
   --color-neutral-100: #F5F5F5;
   --color-neutral-200: #E5E5E5;
   --color-neutral-300: #D4D4D4;
   --color-neutral-400: #A3A3A3;
   --color-neutral-500: #737373;
   --color-neutral-800: #262626;
   --color-neutral-900: #171717;
   --color-plush: #18151D;
   --color-warning-50: #FFFBEB;
   --color-warning-100: #FEF3C7;
   --color-warning-500: #F59E0B;
   --letter-spacing: -0.02rem;
   --spacing-0: 0px;
   --spacing-1: 4px;
   --spacing-2: 8px;
   --spacing-3: 12px;
   --spacing-4: 16px;
   --spacing-5: 20px;
   --spacing-6: 24px;
}

body {
   font-family: "Space Grotesk";
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
   -webkit-appearance: none;
   appearance: none;
   margin: 0;
}

.data {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding: 0px;
   gap: 20px;
   margin-top: 20px;
 } 

.items-info {
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 16px 16px;
   background: ${Colors.neutral_100};
   border-radius: 24px;
   margin-top: 0px; 
}

.info {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 0px;
   height: 48px;  
}

.no-scroll {
   -ms-overflow-style: none;  /* IE and Edge */
   scrollbar-width: none;
   overflow: hidden auto;
}
.no-scroll::-webkit-scrollbar {
   display: none;
}

.cursor-pointer {
   cursor: pointer;
}

.text-overflow-hide {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}

.text {
   text-align: center;
   font-family: "Space Grotesk";
   font-size: 16px;
   font-style: normal;
   font-weight: 400;
   line-height: 30px;
   letter-spacing: 0.8px;
   margin-top: 23px;  
}

.divide {
   width: 100%;
   height: 0px;
   border: 1px solid #E5E5E5;
}

.top-nav {
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding-top: 24px;
   padding-bottom: 24px;
   gap: 8px;
}

.nav-title {
   font-weight: 600;
   font-size: 20px;
   line-height: 28px;
   text-align: center;
   letter-spacing: -0.02em;
   color: ${Colors.neutral_900};
}

.inner-card {
   width: 100%;
   height: 100%;
}

.inner-content {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   
   padding: 0 24px;
}

.rounded-rect {
   border-radius: 24px;
}

.flex-all-center {
   display: flex;
   align-items: center;
   justify-content: center;
}

.flex-col-center {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
}

.flex-row-center {
   display: flex;
   flex-direction: row;
   align-items: center;
   width: 100%;
}

.brand_title {
   font-family: "Inter";
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 28px;
   letter-spacing: -0.02em;
   color: ${Colors.plush_900};  
}

.product-meta {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
}

.brand-title {
   font-family: "Space Grotesk";
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 28px;
   letter-spacing: var(--letter-spacing);
   color: var(--color-plush);
}

.product-name {
   max-height: 40px;
   font-family: "Space Grotesk";
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   text-align: left;
   line-height: 20px;
   color: ${Colors.plush_900};  
   overflow: hidden;
}

.avatar-initials {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background: #fff;
   border-radius: 50%!important;
   overflow: hidden;
}

.avatar-initials-large {
   width: 80px;
   height: 80px;
   background: var(--color-neutral-400);
   font-size: 24px;
}

h6 {
   font-weight: 400;
   font-size: 12px;
   line-height: 20px;
}
h6 > a {
   font-size: 14px;
   line-height: 20px;
}
.header {
   position: absolute;
   top: 38px;
   left: 24px;
   display: flex;
   flex-direction: row;
   align-items: center;
}
.title {
   width: 130px;
   font-family: "Space Grotesk";
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 18px;
   color: ${Colors.white};
   margin-left: 31px;
   margin-right: 31px; 
}

.toast-modal {
   display: flex;
   justify-content: center;
   position: absolute;
   bottom: 10px;
   z-index: 101;
   width: 100%;
   color: red;
}

.inner-modal {
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;

   left: 0;
   top: 0;
   z-index: 100;
   width: 100%;
   border-radius: 15px;
   height: 100%;
   background-color: ${Colors.primary_600}77;
}

.w-30 {
   width: 30%;
}

.object-contain {
   object-fit: contain;
}

.object-cover {
   object-fit: cover;
}

.html-wrapper {
   white-space: pre-wrap;
 }

 h4 {
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 0px;
}

h5 {
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  color: #625D6D;
}

h6 {
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: normal;
  color: #625D6D;
}
`;
export default GlobalStyle;