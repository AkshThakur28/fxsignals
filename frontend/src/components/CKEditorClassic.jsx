import { useEffect, useRef } from "react";

const CKEditorClassic = ({ id, value, onChange }) => {
    const editorRef = useRef();

    useEffect(() => {
        if (!id || !window.CKEDITOR || !editorRef.current) return;

        // Avoid duplicate instance
        if (!window.CKEDITOR.instances[id]) {
            window.CKEDITOR.replace(id, {
                height: 300,
                // Customize toolbar here if needed
            });

            window.CKEDITOR.instances[id].on("change", function () {
                const data = this.getData();
                onChange(data);
            });
        }

        return () => {
            if (window.CKEDITOR.instances[id]) {
                window.CKEDITOR.instances[id].destroy(true);
            }
        };
    }, [id]);

    return (
        <textarea
            id={id}
            name={id}
            defaultValue={value}
            ref={editorRef}
        />
    );
};

export default CKEditorClassic;
