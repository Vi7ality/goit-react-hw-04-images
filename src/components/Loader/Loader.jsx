import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#9f9d9d"
    {...props}
  >
    <rect x="5" y="17" rx="0" ry="0" width="145" height="83" /> 
    <rect x="186" y="18" rx="0" ry="0" width="142" height="81" />
  </ContentLoader>
)

export default MyLoader