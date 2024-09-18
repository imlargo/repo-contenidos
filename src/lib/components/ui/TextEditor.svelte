<script lang="ts">
	type Props = {
		value: string;
	};

	let { value = $bindable() }: Props = $props();
	import { HtmlToMarkdown, MarkdownToHtml } from '$src/lib/utils/markdown-service';
	import { browser } from '$app/environment';

	function TextEditorAction(element: HTMLElement, markdown: string) {
		if (browser) {
			const quill = new Quill(element, {
				modules: {
					toolbar: [[{ header: [3, 4, 5, false] }], ['bold', 'italic'], [{ list: 'bullet' }]]
				},
				placeholder: 'Escriba aqui...',
				theme: 'snow'
			});

			const html = MarkdownToHtml(markdown);
			quill.clipboard.dangerouslyPasteHTML(html + '\n');

			quill.on('text-change', function (delta, source) {
				const htmlContent = quill.getSemanticHTML();
				console.log(htmlContent);

				const parsedMd = HtmlToMarkdown(htmlContent);
				console.log(parsedMd);

				value = parsedMd;
			});
		}
	}
</script>

<div use:TextEditorAction={value}></div>
