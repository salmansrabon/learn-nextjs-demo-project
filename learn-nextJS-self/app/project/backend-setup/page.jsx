import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import LivePreview from '@/components/LivePreview';
import BackendStatus from '@/components/BackendStatus';
import Demo from './Demo';

export default function BackendSetupLesson() {
  return (
    <>
      <PageHeader
        title="4.3 Running the backend"
        description="From here on you are building a real app against a real server. Get it up first."
      />
      <Theory>
        <h3>What you are starting</h3>
        <p>
          <code>user-demo-site/backend</code> is an Express + Sequelize API with JWT authentication
          and two roles, <code>admin</code> and <code>user</code>. You will not modify it. For the
          rest of this chapter it is simply the server your frontend talks to.
        </p>

        <h3>Setup, once</h3>
        <ol>
          <li>Create an empty MySQL database named <code>miniapp1</code>. You do not need to create any tables - Sequelize does that on first run.</li>
          <li>Copy <code>backend/.env.example</code> to <code>backend/.env</code> and set <code>DB_PASSWORD</code> to your MySQL password.</li>
          <li><code>cd user-demo-site/backend &amp;&amp; npm install</code></li>
          <li><code>npm run seed</code> - creates the admin account <code>admin@test.com</code>.</li>
          <li><code>npm run dev</code> - the server starts on port <strong>5000</strong>.</li>
        </ol>
        <p className="note">
          Port 5000 for the backend, 3000 for your Next.js app. They do not collide, so leave both
          running in separate terminals.
        </p>

        <h3>The endpoints you will use</h3>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Who can call it</th><th>Built in</th></tr>
          </thead>
          <tbody>
            <tr><td><code>POST /api/auth/register</code></td><td>anyone</td><td>4.7</td></tr>
            <tr><td><code>POST /api/auth/login</code></td><td>anyone</td><td>4.8</td></tr>
            <tr><td><code>GET /api/auth/me</code></td><td>any logged-in user</td><td>4.15</td></tr>
            <tr><td><code>GET /api/users</code></td><td>admin only</td><td>4.10</td></tr>
            <tr><td><code>GET /api/users/:id</code></td><td>admin only</td><td>4.12</td></tr>
            <tr><td><code>PUT /api/users/:id</code></td><td>admin only</td><td>4.13</td></tr>
            <tr><td><code>DELETE /api/users/:id</code></td><td>admin only</td><td>4.14</td></tr>
            <tr><td><code>PUT /api/users/profile/photo</code></td><td>any logged-in user, own photo</td><td>4.15</td></tr>
          </tbody>
        </table>
        <p>
          Every response has the same shape, <code>{'{'} success, message, data {'}'}</code>, which is
          why one line - <code>err.response?.data?.message</code> - surfaces any error in the whole
          app.
        </p>

        <h3>Check it before you write anything</h3>
        <p>
          <code>GET /api/health</code> needs no token, no body and no database write. If it answers,
          the server is fine and any later failure is in your code. Press the button below.
        </p>
        <p className="note">
          The status strip and the button are part of this book, not of your app. You do not need to
          build them.
        </p>
      </Theory>
      <BackendStatus />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
