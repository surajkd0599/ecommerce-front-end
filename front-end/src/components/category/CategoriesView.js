import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "./FieldView.module.css";
import ViewCategory from "../../containers/Category/ViewCategory";
import Modal from "../UI/Modal/Modal";
import Aux from "../../hoc/Aux/aux";
import { Route } from "react-router";

const CategoryView = React.memo((props) => {
  console.log("Categories are in category view: ", props.passedCategories);

  const [viewId, setViewId] = useState();
  const [editId, setEditId] = useState();

  const onViewCategoryHandler = (id) => {
    setViewId(id);
  };

  const onEditCategoryHandler = (id) => {
    console.log("Category id in edit is : ", id);
    setEditId(id);
  };

  console.log("Props are : ",props)
  if (viewId) {
    const redirect = (
      <div>
        <ViewCategory passedViewId={viewId} />
        <Route
          path={"/viewCategory"}
          component={ViewCategory}
        />
      </div>
    );

    return redirect;
  }

  return (
    <Aux>
      <section className={classes.FieldData}>
        <h4>Fetched Categories</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Category Id</Th>
              <Th>Category Name</Th>
              <Th>Parent Id</Th>
              <Th>View</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.passedCategories.map((categories, count) =>
              categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{count + 1}</Td>
                  <Td>{category.id}</Td>
                  <Td>{category.categoryName}</Td>
                  <Td>{category.parentId}</Td>
                  <Td>
                    <Button
                      clicked={() => onViewCategoryHandler(category.id)}
                      btnType="Success"
                    >
                      View
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      clicked={() => onEditCategoryHandler(category.id)}
                      btnType="Success"
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </section>
    </Aux>
  );
});

export default CategoryView;
