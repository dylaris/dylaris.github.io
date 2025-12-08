// 应用状态管理
function app() {
    return {
        // 状态
        darkMode: false,
        currentSection: 'home',
        searchTerm: '',
        newTodo: '',
        posts: [],
        filteredPosts: [],
        featuredPosts: [],
        whyBornItems: [],
        todos: [],
        currentPost: null,
        totalPosts: 0,
        totalTodos: 0,
        
        // 初始化
        init() {
            this.loadTheme();
            this.loadPosts();
            this.loadWhyBorn();
            this.loadTodos();
            this.handleHashChange();
            window.addEventListener('hashchange', () => this.handleHashChange());
        },
        
        // 主题切换
        toggleTheme() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode);
        },
        
        loadTheme() {
            const saved = localStorage.getItem('darkMode');
            this.darkMode = saved === 'true';
        },
        
        // 导航
        showSection(section) {
            this.currentSection = section;
            window.location.hash = section;
        },
        
        handleHashChange() {
            const hash = window.location.hash.substring(1) || 'home';
            if (['home', 'blog', 'why-born', 'todo', 'contact', 'post-detail'].includes(hash)) {
                this.currentSection = hash;
            }
        },
        
        // 加载博客
        async loadPosts() {
            try {
                const response = await fetch('data/posts.json');
                this.posts = await response.json();
                this.filteredPosts = [...this.posts];
                this.totalPosts = this.posts.length;
                
                // 获取精选文章（最新的3篇）
                this.featuredPosts = this.posts.slice(0, 3);
            } catch (error) {
                console.error('Failed to load posts:', error);
            }
        },
        
        // 搜索过滤
        filterPosts() {
            if (!this.searchTerm.trim()) {
                this.filteredPosts = [...this.posts];
                return;
            }
            
            const term = this.searchTerm.toLowerCase();
            this.filteredPosts = this.posts.filter(post => 
                post.title.toLowerCase().includes(term) ||
                post.summary.toLowerCase().includes(term) ||
                post.tags.some(tag => tag.toLowerCase().includes(term))
            );
        },
        
        // 显示博客详情
        async showPost(postId) {
            try {
                // 实际项目中，这里应该从服务器获取Markdown并渲染
                const post = this.posts.find(p => p.id === postId);
                if (post) {
                    this.currentPost = {
                        ...post,
                        content: `<h1>${post.title}</h1>
                                 <div class="post-meta">
                                     <span>${post.date}</span>
                                     <div class="tags">
                                         ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                     </div>
                                 </div>
                                 <p>${post.summary}</p>
                                 <p>This is a demo blog post content. In a real implementation, 
                                 you would load the actual Markdown content from the posts folder.</p>`
                    };
                    this.showSection('post-detail');
                }
            } catch (error) {
                console.error('Failed to load post:', error);
            }
        },
        
        // 加载Why Born
        async loadWhyBorn() {
            // 实际项目中，这里应该从JSON文件加载
            this.whyBornItems = [
                {
                    id: 'docker',
                    title: 'Why Docker Was Born',
                    description: '解决"在我的机器上能运行"的问题，实现环境一致性。',
                    technology: 'Docker',
                    year: '2013'
                },
                {
                    id: 'react',
                    title: 'Why React Was Born',
                    description: '解决复杂UI的状态管理和更新效率问题。',
                    technology: 'React',
                    year: '2013'
                },
                {
                    id: 'git',
                    title: 'Why Git Was Born',
                    description: '解决Linux内核开发的分布式版本控制需求。',
                    technology: 'Git',
                    year: '2005'
                }
            ];
        },
        
        showWhyBorn(itemId) {
            // 实际实现中，这里会加载并显示详细内容
            alert(`Showing details for: ${itemId}`);
        },
        
        // TODO功能
        async loadTodos() {
            try {
                const response = await fetch('data/todos.json');
                this.todos = await response.json();
                this.totalTodos = this.todos.length;
            } catch (error) {
                console.error('Failed to load todos:', error);
                // 使用示例数据
                this.todos = [
                    { id: 1, text: 'Add blog post about Alpine.js', completed: false },
                    { id: 2, text: 'Implement search functionality', completed: true },
                    { id: 3, text: 'Add dark mode toggle', completed: true }
                ];
                this.totalTodos = this.todos.length;
            }
        },
        
        addTodo() {
            if (!this.newTodo.trim()) return;
            
            const newTodo = {
                id: Date.now(),
                text: this.newTodo,
                completed: false
            };
            
            this.todos.unshift(newTodo);
            this.newTodo = '';
            this.totalTodos = this.todos.length;
            this.saveTodos();
        },
        
        removeTodo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId);
            this.totalTodos = this.todos.length;
            this.saveTodos();
        },
        
        async saveTodos() {
            // 实际项目中，这里应该保存到服务器或本地存储
            try {
                // 模拟保存
                console.log('Saving todos:', this.todos);
            } catch (error) {
                console.error('Failed to save todos:', error);
            }
        },
        
        // 联系表单
        sendMessage(event) {
            event.preventDefault();
            alert('Message sent! (This is a demo)');
            event.target.reset();
        }
    };
}
