import { Fragment } from 'react';
import PageHeader from '@/components/PageHeader';

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

export default function FragmentsPage() {
  return (
    <>
      <PageHeader
        title="Fragments"
        description="Return multiple sibling elements without adding an extra <div> to the DOM."
      />
      <div className="demo">
        <UserInfoShort />
        <hr />
        <UserInfoLong />
      </div>
    </>
  );
}
