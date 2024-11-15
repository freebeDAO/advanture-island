import Link from 'next/link';
import AddNodePage from '../../test/node/AddNodePage';
import NodeListPage from '../../test/node/NodeListPage';
import NodeDetailPage from '../../test/node/NodeDetailPage';
import DeleteNodePage from '../../test/node/DeleteNodePage';
import UpdateNodePage from '../../test/node/UpdateNodePage';



const Home = () => {
  return (
    <div>
      {/* <h1>Welcome to the Node Management System</h1> */}
      <AddNodePage />
      <NodeListPage />
      <NodeDetailPage />
      <DeleteNodePage />
      <UpdateNodePage />
      <Link href="/" style={{ 
        marginTop: '20px', 
        display: 'inline-block', 
        padding: '10px 20px', 
        backgroundColor: '#0070f3', 
        color: '#fff', 
        borderRadius: '5px', 
        textDecoration: 'none',
        textAlign: 'center'
        }}>
        返回主页
      </Link>
    </div>
  );
};

export default Home;