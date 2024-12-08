export const buildDiv = (className) => {
    return ({ children }) => (
        <div className={className} >
            {children}
        </div>
    )
};