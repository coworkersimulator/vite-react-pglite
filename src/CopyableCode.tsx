export function CopyableCode({ code }: { code: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {

    }
  };

  return (
    <pre className="copyable-code">
      <code>{code}</code>
      <button onClick={handleCopy}>Copy</button>
    </pre>
  );
}
