import { CategoryService } from "../../services/CategoryService/CategoryService";

import {
  loadCategory,
  loadCategoryFail,
  loadCreateCategoryDone,
} from "../../stores/CategoryStore/CategoryEvents";

import { CategoryValues, NewCategoryParams } from "../../domains/category";
import { RequestError } from "../../domains/request";

const execute = async ({ description }: NewCategoryParams): Promise<void> => {
  loadCategory();

  return CategoryService.createCategory({
    description,
  })
    .then(() => {
      const category = JSON.parse(
        window.localStorage.getItem("category") ?? "{}",
      ) as CategoryValues;

      category.description = description;

      // categories.unshift(category);
      console.log(category);

      loadCreateCategoryDone(category);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadCategoryFail({ hasError, message });
      throw new Error();
    });
};

const newCategoryUseCase = {
  execute,
};

export default newCategoryUseCase;
