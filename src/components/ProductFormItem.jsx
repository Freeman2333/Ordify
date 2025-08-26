import { useEffect } from "react";
import { useWatch } from "react-hook-form";

import TextInput from "./ui/TextInput";
import Icon from "../assets/Icon";

const ProductFormItem = ({
  index,
  register,
  errors,
  onRemove,
  control,
  setValue,
}) => {
  const quantity = useWatch({ control, name: `products.${index}.quantity` });
  const price = useWatch({ control, name: `products.${index}.unitPrice` });

  useEffect(() => {
    const total = (Number(quantity) || 0) * (Number(price) || 0);
    setValue(`products.${index}.lineTotal`, total);
  }, [price, quantity, index, setValue]);

  const nameError = errors?.products?.[index]?.name?.message;
  const quantityError = errors?.products?.[index]?.quantity?.message;
  const unitPriceError = errors?.products?.[index]?.unitPrice?.message;
  const lineTotalError = errors?.products?.[index]?.lineTotal?.message;

  return (
    <div>
      <div className="flex text-black justify-between items-center">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <TextInput
              {...register(`products.${index}.name`)}
              name={`products.${index}.name`}
              label="Product Name"
              invalid={!!nameError}
              errorMessage={nameError}
              type="text"
            />
          </div>
          <div className="col-span-1">
            <TextInput
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
              })}
              name={`products.${index}.quantity`}
              label="Qty."
              invalid={!!quantityError}
              errorMessage={quantityError}
            />
          </div>
          <div className="col-span-1">
            <TextInput
              {...register(`products.${index}.unitPrice`, {
                valueAsNumber: true,
              })}
              name={`products.${index}.unitPrice`}
              label="Price"
              invalid={!!unitPriceError}
              errorMessage={unitPriceError}
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <TextInput
              {...register(`products.${index}.lineTotal`)}
              disabled
              name={`products.${index}.lineTotal`}
              label="Total"
              invalid={!!lineTotalError}
              errorMessage={lineTotalError}
              type="number"
              min={0}
            />
          </div>
        </div>

        <button
          onClick={onRemove}
          type="button"
          className="cursor-pointer"
          aria-label="Remove product"
        >
          <Icon.Trash className="w-4 h-4 mt-7" />
        </button>
      </div>
    </div>
  );
};

export default ProductFormItem;
