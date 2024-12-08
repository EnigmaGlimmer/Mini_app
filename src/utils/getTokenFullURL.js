export default function getTokenFullURL(
  chain, //  'goerli' | 'amoy' | 'polygon' | 'ethereum',
  address, // string,
  tokenId, // string,
  subType, // 'token' | 'address' | 'contract',
) {
  let contractUrl = '';
  let hideToken = false;
  let realSubType = subType;

  switch (chain) {
    case 'goerli':
      contractUrl = 'https://goerli.etherscan.io';
      break;
    case 'amoy':
      contractUrl = 'https://www.oklink.com/amoy';
      break;
    case 'polygon':
      contractUrl = 'https://polygonscan.com';
      break;
    case 'ethereum':
      contractUrl = 'https://etherscan.io';
      break;
    case 'hedera_testnet':
      contractUrl = 'https://hashscan.io/testnet';
      hideToken = true;
      realSubType = "contract"
      break;
    case 'hedera':
      contractUrl = 'https://hashscan.io/mainnet';
      hideToken = true;
      realSubType = "contract"
      break;
    default:
      contractUrl = 'https://etherscan.io';
  }

  if (!contractUrl || !address) {
    return null;
  }

  const mainUrl= `${contractUrl}/${realSubType}/${address}`;

  if (hideToken) return mainUrl;

  return `${mainUrl}?a=${tokenId || 1}`;
}
