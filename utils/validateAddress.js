function validateAddress(address) {
    return (/^0x[a-fA-F0-9]{40}$/i.test(address));
}
export default validateAddress;