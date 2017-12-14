import React from 'react';
import { connect } from 'react-redux';
import { resolveDomainRequested } from 'actions/ens';
import { isValidENSName } from 'libs/validators';

interface Props {
  // TODO: Update type
  resolveDomainRequested: any;
}

interface State {
  isValidDomain: boolean;
  domainToCheck: string;
}

// TODO: Update state types
class ENSNameInput extends React.Component<Props, State | any> {
  public state = {
    isValidDomain: false,
    domainToCheck: ''
  };

  public onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const domainToCheck: string = event.currentTarget.value;
    this.setState({ domainToCheck });
    const isValidName: boolean = isValidENSName(domainToCheck);
    this.setState({ isValidDomain: isValidName });
  };

  public onClick = (): void => {
    const { isValidDomain, domainToCheck } = this.state;
    const { resolveDomainRequested } = this.props;
    return isValidDomain && resolveDomainRequested(domainToCheck);
  };

  public render() {
    const { isValidDomain, domainToCheck } = this.state;
    const { onChange, onClick } = this;
    return (
      <article className="row Tab-content-pane">
        <section className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
          <div className="input-group">
            <input
              className={`form-control ${
                domainToCheck === '' ? '' : isValidDomain ? 'is-valid' : 'is-invalid'
              }`}
              type="text"
              placeholder="myetherwallet"
              onChange={onChange}
            />
            <div className="input-group-btn">
              <a className="btn btn-default">.eth</a>
            </div>
          </div>
          {isValidDomain ? null : <p>Use at least 7 characters</p>}
          <button className="btn btn-primary " onClick={onClick}>
            Check ENS Name
          </button>
        </section>
      </article>
    );
  }
}

export default connect(null, {
  resolveDomainRequested
})(ENSNameInput);
