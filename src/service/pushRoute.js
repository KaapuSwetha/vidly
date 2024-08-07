
import { useNavigate, useParams, useLocation } from 'react-router-dom';
export function pushroute(Component) {
  return (props) => (
    <Component
      {...props}
      location={useLocation()}
      params={useParams()}
      navigate={useNavigate()}
    />
    
  );
}