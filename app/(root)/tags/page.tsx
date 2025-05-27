import { getTags } from '@/lib/actions/tag.action';

const Tags = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
  });

  const { tags } = data || {};

  console.log('Tags are', JSON.stringify(tags, null, 2));
  return <div>Tags</div>;
};

export default Tags;
