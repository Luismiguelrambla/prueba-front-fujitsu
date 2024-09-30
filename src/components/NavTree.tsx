import { useEffect, useState } from 'react';
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import './NavTree.css';
import { useTranslation } from 'react-i18next';

export const NodeService = {
  getTreeNodesData() {
    return [
      {
        key: '0',
        label: 'Bandeja de entrada',
        data: 'Bandeja de entrada',
        icon: 'pi pi-fw pi-inbox',
      },
      {
        key: '1',
        label: 'Contenido de las Islas Baleares',
        data: 'Contenido de las Islas Baleares',
        icon: 'pi pi-fw pi-folder-open',
        children: [
          {
            key: '1-0',
            label: 'Expediente Personal',
            icon: 'pi pi-fw pi-folder',
            data: 'Expediente Personal',
          },
          {
            key: '1-1',
            label: 'Expedientes Material',
            icon: 'pi pi-fw pi-folder',
            data: 'Expedientes Material',
          },
        ],
      },
    ];
  },

  getTreeNodes() {
    return Promise.resolve(this.getTreeNodesData());
  },
};

const NavTree = () => {
  const { t } = useTranslation();
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
    NodeService.getTreeNodes().then((data) => setNodes(data));
  }, []);

  return (
    <>
      <Tree
        value={nodes}
        filter
        filterMode="strict"
        filterPlaceholder={t('NavTree.filterPlaceholder')}
        emptyMessage={t('NavTree.emptyMessage')}
      />
    </>
  );
};

export default NavTree;
