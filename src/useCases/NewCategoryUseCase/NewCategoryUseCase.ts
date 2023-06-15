import { CategoryService } from "../../services/CategoryService/CategoryService";

import {
  loadCategory,
  loadCategoryFail,
  loadCreateCategoryDone,
} from "../../stores/CategoryStore/CategoryEvents";

import { NewCategoryParams } from "../../domains/category";
import { RequestError } from "../../domains/request";

const execute = async ({ description }: NewCategoryParams): Promise<void> => {
  loadCategory();

  return CategoryService.createCategory({
    description,
  })
    .then(({ id }: any) => {
      loadCreateCategoryDone([{ id, description }]);
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
