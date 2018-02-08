import {
  HISTORY_PERSON,
  GENE_GOODS_LIST,
} from './constants';

export function historyPerson(params) {
  return ({ fetch }) => ({
    type: HISTORY_PERSON,
    payload: {
      promise: fetch().historyPerson(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function geneGoodsList(params) {
  return ({ fetch }) => ({
    type: GENE_GOODS_LIST,
    payload: {
      promise: fetch().geneGoodsList(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function buyReducer(params) {
  return ({ fetch }) => ({
    type: 'buyReducer',
    payload: (state)=>{
      return params
    },
  });
}

export function total(params) {
  return ({ fetch }) => ({
    type: 'total',
    payload: (state)=>{
      return params
    },
  });
}