import { Aux } from 'components/ui';
import React, { Component } from 'react';
import translate, { translateRaw } from 'translations';
import { Query } from 'components/renderCbs';
import { ICurrentValue, getCurrentValue, dataExists } from 'selectors/transaction';
import { AppState } from 'reducers';
import { connect } from 'react-redux';
import { CallbackProps } from 'components/AmountFieldFactory';

interface OwnProps {
  onChange(ev: React.FormEvent<HTMLInputElement>);
  withProps(props: CallbackProps): React.ReactElement<any> | null;
}

interface StateProps {
  currentValue: ICurrentValue;
  dataExists: boolean;
}

type Props = OwnProps & StateProps;

/* 
          <Aux>

            <label>{translate('SEND_amount')}</label>

            <input
              className={`form-control ${
                !!value || this.props.dataExists ? 'is-valid' : 'is-invalid'
              }`}
              type="number"
              placeholder={translateRaw('SEND_amount_short')}
              value={raw}
              readOnly={!!readOnly}
              onChange={onChange}
            />

          </Aux>
            
*/
class AmountInputClass extends Component<Props> {
  public render() {
    const { currentValue, onChange, withProps } = this.props;
    const { value } = currentValue;

    return (
      <Query
        params={['readOnly']}
        withQuery={({ readOnly }) =>
          withProps({
            currentValue,
            isValid: !!(value || this.props.dataExists),
            readOnly: !!readOnly,
            onChange
          })
        }
      />
    );
  }
}

export const AmountInput = connect((state: AppState) => ({
  currentValue: getCurrentValue(state),
  dataExists: dataExists(state)
}))(AmountInputClass);