export function getAllProfileUseCase(repo: any) {
    return repo.getAllData()
}

export function getDataByIdUseCase(repo: any, id: string) {
    let filter = { _id: id }
    return repo.getDataById(filter)
}
