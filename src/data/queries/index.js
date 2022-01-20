import { gql } from '@apollo/client';

export const queries = {
  getMonthExpenses: gql`query getMonthExpenses(
    $userId: String!
    $year: Float!
    $month: Float!
    $week: Float!
    $day: Float!
  ) {
    getMonthExpenses (
      userId: $userId
      year: $year
      month: $month
      week: $week
      day: $day
    ) {
      categories {
        _id
        name
        childOf
        userId
      }
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
  getCurrentUser: gql`query getCurrentUser($id: String!){
    getCurrentUser(id: $id){
      email
      _id
      login
    }
  }`,
  
};