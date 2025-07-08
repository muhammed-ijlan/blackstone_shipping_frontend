function BrokenComponent() {
    throw new Error("Intentional test error");
    return <div>This will never render</div>;
}
export default BrokenComponent;