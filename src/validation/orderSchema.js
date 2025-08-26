import * as Yup from "yup";

export const orderSchema = Yup.object({
  clientName: Yup.string()
    .trim()
    .matches(/\S+/, "Client Name cannot be empty or whitespace")
    .required("Client Name is required"),
  clientEmail: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Client Email is required"),
  streetAddress: Yup.string()
    .trim()
    .matches(/\S+/, "Street Address cannot be empty or whitespace")
    .required("Street Address is required"),
  city: Yup.string()
    .trim()
    .matches(/\S+/, "City cannot be empty or whitespace")
    .required("City is required"),
  postCode: Yup.number()
    .typeError("Post Code must be a number")
    .required("Post Code is required")
    .max(99999999, "Too long"),
  country: Yup.string()
    .trim()
    .matches(/\S+/, "Country cannot be empty or whitespace")
    .required("Country is required"),
  orderDate: Yup.date()
    .required("Order Date is required")
    .typeError("Order Date must be a valid date"),
  products: Yup.array()
    .of(
      Yup.object({
        name: Yup.string()
          .trim()
          .matches(/\S+/, "Product name cannot be empty or whitespace")
          .required("Product name is required"),
        quantity: Yup.number()
          .min(0, "Quantity cannot be negative")
          .required("Quantity is required"),
        unitPrice: Yup.number()
          .min(0, "Price cannot be negative")
          .required("Price is required"),
        lineTotal: Yup.number()
          .min(0, "Total cannot be negative")
          .required("Total is required"),
      })
    )
    .optional(),
});
