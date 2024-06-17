const updateOne = (id: number, message: string) => `
UPDATE ss
SET message = '${message}' , totaledit = totaledit + 1
WHERE id = ${id}
`;

export default updateOne;
