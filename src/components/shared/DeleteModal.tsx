interface DeleteModalComponentProps {
  handleDeleteItem: () => void
  cancelAction: () => void
}

export const DeleteModalComponent = ({
  handleDeleteItem,
  cancelAction
}: DeleteModalComponentProps) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/5 dark:bg-gray-100/5 transition-opacity" aria-hidden="true"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-6 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white dark:bg-cardDark h-40 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-700 dark:text-textLight" id="modal-title">Excluir item</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Você tem certeza que deseja remover esse item? A ação não pode ser desfeita.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-cardDark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button 
                type="button" 
                onClick={handleDeleteItem}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">
                Excluir
              </button>
              <button 
                type="button" 
                onClick={cancelAction}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}