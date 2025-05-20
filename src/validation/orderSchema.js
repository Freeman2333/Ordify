import * as Yup from "yup";

export const orderSchema = Yup.object({
  clientName: Yup.string().required("Client Name is required"),
  clientEmail: Yup.string()
    .email("Invalid email")
    .required("Client Email is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  postCode: Yup.string().required("Post Code is required"),
  country: Yup.string().required("Country is required"),
  orderDate: Yup.date()
    .required("Order Date is required")
    .typeError("Order Date must be a valid date"),
  products: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Product name is required"),
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
