import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "./ui/Button";
import Popup from "./ui/Popup";
import TextInput from "./ui/TextInput";
import { orderSchema } from "../validation/orderSchema";
import ProductFormItem from "./ProductFormItem";

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

const OrderModal = ({ isOpen, onClose, type, initialValues = {} }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: initialValues || defaultEmptyValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      // reset();
      // onClose();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const onPopupClose = () => {
    reset();
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onPopupClose} size="2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="scrollbar-hide flex flex-col bg-white h-screen md:rounded-r-3xl">
          <div className="flex-1 overflow-y-auto py-5 px-6">
            <h1 className="font-semibold text-3xl text-center">
              {type === "edit" ? "Edit" : "Create"} Order
            </h1>

            <h1 className="text-[#7c5dfa] my-4 mt-9 font-medium">Bill To</h1>

            <div className="grid grid-cols-3 mx-1 space-y-4">
              <div className="col-span-3">
                <TextInput
                  {...register("clientName")}
                  name="clientName"
                  label="Client Name"
                  error={errors.clientName?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("clientEmail")}
                  name="clientEmail"
                  label="Client Email"
                  error={errors.clientEmail?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("streetAddress")}
                  name="streetAddress"
                  label="Street Address"
                  error={errors.streetAddress?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("city")}
                  name="city"
                  label="City"
                  error={errors.city?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("postCode")}
                  name="postCode"
                  label="Post Code"
                  error={errors.postCode?.message}
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  {...register("country")}
                  name="country"
                  label="Country"
                  error={errors.country?.message}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  {...register("orderDate")}
                  name="orderDate"
                  label="Order Date"
                  type="date"
                  error={errors.orderDate?.message}
                />
              </div>
            </div>
          </div>

          {/* Item List Section */}

          <h2 className="text-2xl text-gray-500 mt-10 ">Item List</h2>

          <div className="space-y-4">
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
              type="button"
              onClick={() =>
                append({ name: "", quantity: 1, price: 0, total: 0 })
              }
              className="w-full mt-4"
            >
              + Add Product
            </Button>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 left-0 right-0">
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting} variant="primary">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button onClick={onClose} variant="default" type="button">
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
