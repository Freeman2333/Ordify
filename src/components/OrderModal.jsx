import { useId } from "react";
import { useNavigate } from "react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Button from "./ui/Button";
import Popup from "./ui/Popup";
import TextInput from "./ui/TextInput";
import { orderSchema } from "../validation/orderSchema";
import ProductFormItem from "./ProductFormItem";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "../redux/services/mainApi";
import { formatDate, generateId } from "../utils/utils";
import { ORDER_MODAL_TYPE, STATUSES } from "../constants";

const defaultEmptyValues = {
  clientName: "",
  clientEmail: "",
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
  orderDate: new Date(),
  products: [],
};

const OrderModal = ({ isOpen, onClose, type, initialValues, orderId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: initialValues || defaultEmptyValues,
  });

  const title = `${type === ORDER_MODAL_TYPE.EDIT ? "Edit" : "Create"} Order`;
  const descId = useId();

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const [triggerCreateOrder] = useCreateOrderMutation();
  const [triggerUpdateOrder] = useUpdateOrderMutation();

  const onSubmit = async (data) => {
    try {
      const { streetAddress, city, postCode, country, orderDate, ...mainData } =
        data;
      const submitedData = {
        ...mainData,
        id: orderId,
        orderDate: formatDate(orderDate, "yyyy-MM-dd"),
        clientAddress: { street: streetAddress, city, postCode, country },
        status: STATUSES.DRAFT,
        total: data.products.reduce(
          (total, product) => total + product.lineTotal,
          0
        ),
      };

      if (type === ORDER_MODAL_TYPE.CREATE) {
        const finalData = {
          ...submitedData,
          products: submitedData.products.map((product) => ({
            ...product,
            id: generateId(),
          })),
        };

        const data = await triggerCreateOrder(finalData).unwrap();

        toast.success("Order created successfully");
        navigate(`/orders/${data.id}`);
      } else {
        await triggerUpdateOrder(submitedData).unwrap();

        toast.success("Order updated successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Submission error:", error);
    }
  };

  const onPopupClose = () => {
    reset();
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onPopupClose}
      size="2xl"
      labelledById={descId}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="scrollbar-hide flex flex-col bg-white h-screen md:rounded-r-3xl">
          <div className="py-5 px-6">
            <h3 className="font-semibold text-3xl text-center" id={title}>
              {title}
            </h3>
            <h4 className="text-accent my-4 mt-9 font-medium">Bill To</h4>

            <div className="grid grid-cols-3 mx-1 space-y-4">
              <div className="col-span-3">
                <TextInput
                  {...register("clientName")}
                  name="clientName"
                  label="Client Name"
                  invalid={!!errors.clientName}
                  errorMessage={errors.clientName?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("clientEmail")}
                  name="clientEmail"
                  label="Client Email"
                  invalid={!!errors.clientEmail}
                  errorMessage={errors.clientEmail?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("streetAddress")}
                  name="streetAddress"
                  label="Street Address"
                  invalid={!!errors.streetAddress}
                  errorMessage={errors.streetAddress?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("city")}
                  name="city"
                  label="City"
                  invalid={!!errors.city}
                  errorMessage={errors.city?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("postCode")}
                  name="postCode"
                  label="Post Code"
                  invalid={!!errors.postCode}
                  errorMessage={errors.postCode?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("country")}
                  name="country"
                  label="Country"
                  invalid={!!errors.country}
                  errorMessage={errors.country?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("orderDate")}
                  name="orderDate"
                  label="Order Date"
                  type="date"
                  invalid={!!errors.orderDate}
                  errorMessage={errors.orderDate?.message}
                />
              </div>
            </div>
          </div>

          {/* Item List Section */}

          <h3 className="text-2xl text-gray-500 mt-10 ">Item List</h3>

          <div className="space-y-4 pb-10">
            {fields.map((field, index) => (
              <ProductFormItem
                key={field.id}
                index={index}
                register={register}
                setValue={setValue}
                control={control}
                errors={errors}
                onRemove={() => remove(index)}
              />
            ))}

            <Button
              onClick={() =>
                append({ name: "", quantity: 1, unitPrice: 0, lineTotal: 0 })
              }
              className="w-full mt-4"
            >
              + Add Product
            </Button>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-8 left-0 right-0">
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
                variant="primary"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={onClose}
                variant="default"
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Popup>
  );
};

export default OrderModal;
