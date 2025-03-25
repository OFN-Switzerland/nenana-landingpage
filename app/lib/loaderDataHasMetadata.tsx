export const loaderDataHasMetadata = (
	data: any,
): data is { title: string; description: string } => {
	return data && 'title' in data && 'description' in data
}
