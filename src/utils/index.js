export * from './storage';
export * from './constants';

/**
 * This function returns the value of an attribute of vaultik.js iframe.
 * To do this, it iterates all <script> tags and find the one with vaultik.js
 * And from the tag, get the attribute needed.
 * 
 * For example, in the below script, 
 *  calling getAttributeFromScript('brand') will return "75cfc28c-e623-4cc4-a8bb-b6a27724aa3a"
 * 
 * <script 
 *  type="text/JavaScript" 
 *  src="https://cdn.vaultik.com/mini-web/dev/vaultik.js" 
 *  brand="75cfc28c-e623-4cc4-a8bb-b6a27724aa3a"
 * ></script>
 * 
 * @param {string} attribute An attribute to fetch value
 * @returns A value of the attribute
 */
export const getAttributeFromScript = (attribute) => {
    const vaultikScript = Object.values(document.scripts)?.find(
        (script) => !!script.getAttribute('src')?.includes('vaultik.js')
    );

    // Get account id from query
    const strSrc = vaultikScript?.getAttribute('src');
    const query = strSrc?.split('?')?.[1];
    if (query) {
        const params = {};
        for (let param of query.split('&') || []) {
            const [key, value] = param.split('=');
            params[key] = value;
        }

        if (typeof params[attribute] !== 'undefined') {
            return params[attribute];
        }
    }

    // Get account id from attribute 'id'
    return vaultikScript?.getAttribute(attribute);
};
