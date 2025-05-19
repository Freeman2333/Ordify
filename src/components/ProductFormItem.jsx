import { useEffect } from "react";
import { useWatch } from "react-hook-form";

import TextInput from "./ui/TextInput";
import trashIcon from "../assets/trash.svg";

const ProductFormItem = ({
  index,
  register,
  errors,
  onRemove,
  control,
  setValue,
}) => {
  const quantity = useWatch({ control, name: `products.${index}.quantity` });
  const price = useWatch({ control, name: `products.${index}.price` });

  useEffect(() => {
    const total = (Number(quantity) || 0) * (Number(price) || 0);
    setValue(`products.${index}.total`, total);
  }, [price, quantity, index, setValue]);

  return (
    <div>
      <div className="flex text-black justify-between items-center">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <TextInput
              {...register(`products.${index}.name`)}
              name={`products.${index}.name`}
              label="Product Name"
              error={errors?.products?.[index]?.name?.message}
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
              error={errors?.products?.[index]?.quantity?.message}
              type="number"
              min={0}
            />
          </div>
          <div className="col-span-1">
            <TextInput
              {...register(`products.${index}.unitPrice`, {
                valueAsNumber: true,
              })}
              name={`products.${index}.price`}
              label="Price"
              error={errors?.products?.[index]?.unitPrice?.message}
              type="number"
              min={0}
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <TextInput
              {...register(`products.${index}.lineTotal`)}
              disabled
              name={`products.${index}.lineTotal`}
              label="Total"
              error={errors?.products?.[index]?.total?.message}
              type="number"
              min={0}
            />
          </div>
        </div>

        <button onClick={onRemove} type="button" className="cursor-pointer">
          <img className="w-10 h-10 mt-7" src={trashIcon} alt="remove" />
        </button>
      </div>
    </div>
  );
};

export default ProductFormItem;
