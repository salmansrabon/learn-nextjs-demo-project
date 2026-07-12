import { Fragment } from 'react';

function UserInfoShort() {
  return (
    // Short syntax — most common
    <>
      <h3>Alex</h3>
      <p>alex@email.com</p>
    </>
  );
}

function UserInfoLong() {
  return (
    // Long syntax — same result, explicit import
    <Fragment>
      <h3>Sara</h3>
      <p>sara@email.com</p>
    </Fragment>
  );
}

export default function Demo() {
  return (
    <div className="demo">
      <UserInfoShort />
      <hr />
      <UserInfoLong />
    </div>
  );
}
