﻿using BookStore.Core.Models;
using BookStore.DataAccess.Repositories;

namespace BookStore.Application.Services
{
    public class BooksService : IBooksService
    {
        private readonly IBooksRepository _booksRepository;

        public BooksService(IBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _booksRepository.Get();
        }

        public async Task<Guid> Create(Book book)
        {
            return await _booksRepository.Create(book);
        }

        public async Task<Guid> Update(Guid id, string title, string description, decimal price)
        {
            return await _booksRepository.Update(id, title, description, price);
        }

        public async Task<Guid> Delete(Guid id)
        {
            return await _booksRepository.Delete(id);
        }
    }
}
