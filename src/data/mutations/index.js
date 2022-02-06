import { gql } from '@apollo/client';

export const mutations = {
  updateExpenses: gql`mutation updateExpenses($_id: String!, $updateExpenseInput: UpdateExpensesInput!) {
    updateExpenses(_id:$_id, updateExpenseInput: $updateExpenseInput) {
      month {
        total
        expenses {
          price
          category
        }
      }
      week {
        total
        expenses {
          price
          category
        }
      }
      day {
        _id
        total
        expenses {
          price
          category
        }
      }
    }
  }`,
  createExpenses: gql`mutation createExpenses($createExpensesInput: CreateExpensesInput!) {
    createExpenses(createExpensesInput: $createExpensesInput) {
      month {
        total
        expenses {
          price
          category
        }
      }
      week {
        total
        expenses {
          price
          category
        }
      }
      day {
        total
        expenses {
          price
          category
        }
      }
    }
  }`,
  createCategory: gql`mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      childOf
      name
      userId
    }
  }`,
  login: gql`mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
      user {
        _id
        login
        email
      }
    }
  }`,
  deleteExpensesCategory: gql `mutation removeExpensesCategory(
    $fields: RemoveExpensesCategoryInput!
  ) {
    removeExpensesCategory(
      removeExpensesCategoryInput: $fields
    ) {
      categories {
        _id
        childOf
        name
        userId
      }
      day {
        total
        expenses {
          category
          price
        }
      }
      week {
        total
        expenses {
          category
          price
        }
      }
      month {
        total
        expenses {
          category
          price
        }
      }
    }
  }`,
};
