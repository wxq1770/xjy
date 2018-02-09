import { fromJS } from 'immutable';

const initialState = fromJS({
  invoice_person: '',
  invoice_title: '',
  invoice_number: '',
  consignee: '',
  mobile: '',
  address: '',
  tab: 0,
  district: [],
});

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case 'addressReducer': {
      const response = action.payload;
      const value = response();
      return state.set(value.type, fromJS(value.value || {}));
    }
    case 'clearStore': {
      return fromJS({
        invoice_person: '',
        invoice_title: '',
        invoice_number: '',
        consignee: '',
        mobile: '',
        address: '',
        tab: 0,
        district: [],
      });
    }
  }
  return state;
}
