export function shallowEqual(prev, next) {
  if (prev === next) return true;
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) return false;

  return prevKeys.every((key) => (
    Object.prototype.hasOwnProperty.call(prev, key) && prev[key] === next[key])
  );
}

function PureRender(Component) {
  const components = Component;
  components.prototype.shouldComponentUpdate = (nextProps, nextState) => (
    PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state)
  );
}

PureRender.shouldComponentUpdate = (nextProps, nextState, preProps, preState) => (
  !shallowEqual(preProps, nextProps) || !shallowEqual(preState, nextState)
);

export default PureRender;
