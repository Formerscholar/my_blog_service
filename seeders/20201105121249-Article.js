'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'articles',
      [
        {
          title: 'JavaScript数组',
          synopsis: '在使用构造函数创建数组时如果传入一个数字参数，则会创建一个长度为参数的数组，如果传入多个，则创建一个数组，参数作为初始化数据加到数组中',
          content: `<div class="markdown-body"><h3 class="heading" data-id="heading-0">构造函数</h3>
          <p>在使用构造函数创建数组时如果传入一个数字参数，则会创建一个长度为参数的数组，如果传入多个，则创建一个数组，参数作为初始化数据加到数组中</p>
          <pre><code class="hljs bash copyable" lang="bash">var a1 = new Array(5);
          console.log(a1.length);//5
          console.log(a1); //会生成一个length为5，每一个都是undefined的数组
          
          var a2 = new Array(5,6);
          console.log(a2.length);//2
          console.log(a2); //[5,6]
          <span class="copy-code-btn">复制代码</span></code></pre><h3 class="heading" data-id="heading-1">数组的定义</h3>
          <p>数组（<code>array</code>）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。</p>
          <p>JS理解：数据就是原型链中有 <code>Array.prototype</code> 的对象</p>
          <p>当我们声明一个 <code>var a1 = [1, 2, 3];</code> 的时候，会生成一个有四个 <code>key</code> 数组对象。为什么 <code>a1</code> 它有 <code>push</code> 函数呢
          因为我们连接到了一个公用对象，可以在公用对象中找到，它的 <code>__proto__</code> 指向 <code>Array.prototype</code>
          </p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/9/21/165f7f3d8a5e89ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1280" data-height="853" src="https://user-gold-cdn.xitu.io/2018/9/21/165f7f3d8a5e89ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption></figcaption></figure><p></p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1, 2, 3]
          
          var obj = {
              0: 1,
              1: 2,
              2: 3,
              length: 3
          }
          <span class="copy-code-btn">复制代码</span></code></pre><p>这两个声明其实不是同一个对象，为什么呢？</p>
          <p>因为它们的公用属性是不一样的。<code>a.__proto__</code> 指向的是数组的公用属性 <code>Array.prototype</code>，这个公用属性有 <code>push</code>、<code>pop</code> 等函数，<code>Array.__proto__</code> 指向的是 <code>Object.prototype</code>。而 <code>obj.__proto__</code> 并没有指向 <code>Array.prototype</code>，它是 <code>Object</code> 构造出来的，直接指向 <code>Object.prototype</code>。也就是说这两个对象本身的内存是没有区别的，它的区别在于原型是不一样的。数组之所以为数组，是因为它拥有数组的特点，对象之所以为对象，是因为它没有数组的特点。所以数组和对象本质的区别就是它们的 <code>__proto__</code> 有没有指向 <code>Array.prototype</code>。
          </p><figure><img class="lazyload inited" data-src="https://user-gold-cdn.xitu.io/2018/9/21/165f7f5e55e443a2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1280" data-height="821" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;1280&quot; height=&quot;821&quot;></svg>"><figcaption></figcaption></figure><p></p>
          <h3 class="heading" data-id="heading-2">数组的索引与长度</h3>
          <p>数组的值可以通过自然数索引访问进行读写操作，下标也可以是一个得出非负整数的变量或表达式</p>
          <pre><code class="hljs bash copyable" lang="bash">var a1 = [1,2,3,4];
          console.log(a1[0]); //1
          var i=1;
          console.log(a1[i]); //2
          console.log(a1[++i]); //3
          <span class="copy-code-btn">复制代码</span></code></pre><p>数组也是对象，我们可以使用索引的奥秘在于，数组会把索引值转换为对应字符串 <code>(1 =&gt; '1')</code> 作为对象属性名</p>
          <pre><code class="hljs bash copyable" lang="bash">console.log(1 <span class="hljs-keyword">in</span> a1);//<span class="hljs-literal">true</span>，确实是一个属性
          <span class="copy-code-btn">复制代码</span></code></pre><p>这样我们可以看出所有的索引都是属性名，但只有自然数（有最大值）才是索引。数组的索引可以不是连续的，访问 <code>index</code> 不存在的元素的时候返回 <code>undefined</code></p>
          <pre><code class="hljs bash copyable" lang="bash">var a = new Array(1,2,3);
          a[100] = 100;
          console.log(a.length); //101
          console.log(a[3]); //undefined
          console.log(a[100]); 100
          <span class="copy-code-btn">复制代码</span></code></pre><p>上面的例子中，虽然直接对 <code>a[100]</code> 赋值不会影响 <code>a[4]</code> 或 <code>a[99]</code>,但数组的长度却受到影响，数组 <code>length</code> 属性等于数组中最大的 <code>index+1</code>，我们知道数组的 <code>length</code> 属性同样是个可写的属性，当强制把数组的 <code>length</code> 属性值设置为小于等于最大 <code>index</code> 值时，数组会自动删除 <code>indexd</code> 大于等于 <code>length</code> 的数据，在刚才代码中追加几句</p>
          <pre><code class="hljs bash copyable" lang="bash">a.length = 2
          console.log(a);//[1,2]
          <span class="copy-code-btn">复制代码</span></code></pre><p>这时候会发现 <code>a[2]</code> 和 <code>a[100]</code> 被自动删除了，同理，如果把 <code>length</code> 设置为大于最大 <code>index+1</code> 的值的时候，数组也会自动扩张，但是不会为数组添加新元素，只是在尾部追加空空间</p>
          <pre><code class="hljs bash copyable" lang="bash">a.length=5;
          console.log(a); //[1,2] //后面没有3个undefined    
          <span class="copy-code-btn">复制代码</span></code></pre><h3 class="heading" data-id="heading-3">数组的 API</h3>
          <ol>
          <li><code>splice()</code></li>
          </ol>
          <p><code>splice</code> 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。方法有三个参数，开始索引，删除元素的位移和插入的新元素，当然也可以写多个。</p>
          <ul>
          <li>删除
          <code>splice</code> 的第一个参数是删除的起始位置（从 0 开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素</li>
          </ul>
          <pre><code class="hljs bash copyable" lang="bash">var a = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>, <span class="hljs-string">'f'</span>];
          a.splice(4, 2) // [<span class="hljs-string">"e"</span>, <span class="hljs-string">"f"</span>]
          a // [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"d"</span>]
          
          a.splice(4, 2, 1, 2) // [<span class="hljs-string">"e"</span>, <span class="hljs-string">"f"</span>]
          a // [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"d"</span>, 1, 2]
          <span class="copy-code-btn">复制代码</span></code></pre><ul>
          <li>添加
          如果只是单纯地插入元素，<code>splice</code> 方法的第二个参数可以设为 0</li>
          </ul>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1, 1, 1];
          a.splice(1, 0, 2) // []
          a // [1, 2, 1, 1]
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>slice()</code></li>
          </ol>
          <p><code>slice</code> 方法用于提取目标数组的一部分，返回一个新数组，原数组不变。</p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1,2,3,4,5];
          a.slice(1,2);//2 从 a 下标为1开始，到下标为2结束(不包括2)，做为新数组，原数组不变
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>reverse()</code></li>
          </ol>
          <p><code>reverse</code> 方法用于将数组逆序，与之前不同的是它会修改原数组</p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1,2,3,4,5];
          a.reverse();
          console.log(a); //[5, 4, 3, 2, 1]
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>join()</code></li>
          </ol>
          <p><code>join</code> 方法是把数组元素（对象调用其 <code>toString()</code> 方法）使用参数作为连接符连接成一字符串，不会修改原数组内容。如果不提供参数，默认用逗号分隔。</p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1, 2, 3];
          
          a.join(<span class="hljs-string">' '</span>) // <span class="hljs-string">'1 2 3'</span>
          a.join(<span class="hljs-string">' . '</span>) // <span class="hljs-string">"1 . 2 . 3"</span>
          a.join() // <span class="hljs-string">"1,2,3"</span>
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>concat()</code></li>
          </ol>
          <p>看起来像是剪切，但这个真不是形声字，<code>concat</code> 方法用于拼接数组，<code>a.concat(b)</code> 返回一个 a 和 b 共同组成的新数组，同样不会修改任何一个原始数组，也不会递归连接数组内部数组。</p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1,2,3,4,5]; 
          var b = [6,7,8,9]; 
          console.log(a.concat(b));    //[1, 2, 3, 4, 5, 6, 7, 8, 9] 
          console.log(a);     //[1, 2, 3, 4, 5] 
          console.log(b);     //[6, 7, 8, 9]
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>forEach()</code></li>
          </ol>
          <p><code>forEach</code> 方法对数组的所有成员依次执行参数函数，该函数接受三个参数：<code>value</code>、<code>key</code>、整个数组。</p>
          <pre><code class="hljs bash copyable" lang="bash">var a = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
          a.forEach(<span class="hljs-keyword">function</span>(q, w, e){
              console.log(q, w, e)
          })
          
          // a 0 (3) [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
          // b 1 (3) [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
          // c 2 (3) [<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>]
          <span class="copy-code-btn">复制代码</span></code></pre><p></p><figure><img class="lazyload inited" data-src="https://user-gold-cdn.xitu.io/2018/9/21/165f818a661cec0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="574" data-height="161" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;574&quot; height=&quot;161&quot;></svg>"><figcaption></figcaption></figure><p></p>
          <ol>
          <li><code>sort()</code></li>
          </ol>
          <p><code>sort</code> 方法对数组成员进行排序，默认是按照转换为的字符串的诸个字符的 Unicode 位点进行排序。排序后，原数组将被改变。</p>
          <pre><code class="hljs bash copyable" lang="bash">[4, 3, 2, 1].sort()
          // [1, 2, 3, 4]
          <span class="copy-code-btn">复制代码</span></code></pre><p>如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数。</p>
          <pre><code class="hljs bash copyable" lang="bash">var items = [
              { name: <span class="hljs-string">'Edward'</span>, value: 37},
              { name: <span class="hljs-string">'Sharpe'</span>, value: 24},
              { name: <span class="hljs-string">'And'</span>, value: 45 }
          ];
          items.sort(<span class="hljs-keyword">function</span> (a, b) {
              <span class="hljs-built_in">return</span> (a.value - b.value)
          });
          
          // {name: <span class="hljs-string">"Sharpe"</span>, value: 24}
          // {name: <span class="hljs-string">"Edward"</span>, value: 37}
          // {name: <span class="hljs-string">"And"</span>, value: 45}
          <span class="copy-code-btn">复制代码</span></code></pre><p></p><figure><img class="lazyload inited" data-src="https://user-gold-cdn.xitu.io/2018/9/21/165f81a41f0291be?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="580" data-height="243" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;580&quot; height=&quot;243&quot;></svg>"><figcaption></figcaption></figure>
          <code>sort</code> 的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于 0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。<p></p>
          <ol>
          <li><code>map()</code></li>
          </ol>
          <p><code>map</code> 方法对数组中每一元素进行处理，函数返回值组成一个新数组返回，新数组索引结构和原数组一致，原数组保持不变。</p>
          <pre><code class="hljs bash copyable" lang="bash">var arr = [1, 2, 3, 4, 5, 6]
          arr.map(<span class="hljs-keyword">function</span>(val){
               <span class="hljs-built_in">return</span> val*val
          
          // [1, 4, 9, 16, 25, 36]
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>filter()</code></li>
          </ol>
          <p><code>filter</code> 方法用于过滤数组成员，接受一个函数，所有数组成员依次执行该函数，返回结果为 <code>true</code> 的成员组成一个新数组返回。</p>
          <pre><code class="hljs bash copyable" lang="bash">var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
          arr.filter(<span class="hljs-keyword">function</span> (val) {
            <span class="hljs-built_in">return</span> (val &gt; 5);
          })
          // [6, 7, 8, 9]
          <span class="copy-code-btn">复制代码</span></code></pre><ol>
          <li><code>reduce()</code></li>
          </ol>
          <p><code>reduce</code> 方法依次处理数组的每个成员，两元素（或参数）执行操作，数组元素返回组合成一个值，遍历数组，继续和数组中 其他元素组合，最终得出结果。</p>
          <pre><code class="hljs bash copyable" lang="bash">var arr = [1, 2, 3, 4, 5]
          arr.reduce(<span class="hljs-keyword">function</span> (a, b) {
            console.log(a, b);
            <span class="hljs-built_in">return</span> a + b;
          })
          // 15
          <span class="copy-code-btn">复制代码</span></code></pre><ul>
          <li><code>map</code> 可以用 <code>reduce</code> 表示</li>
          </ul>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1, 2, 3]
          a.reduce(<span class="hljs-keyword">function</span>(arr, n){
              arr.push(n * 2)
              <span class="hljs-built_in">return</span> arr
          }, [])
          
          // [2, 4, 6]
          <span class="copy-code-btn">复制代码</span></code></pre><ul>
          <li><code>filter</code> 可以用 <code>reduce</code>表示</li>
          </ul>
          <pre><code class="hljs bash copyable" lang="bash">var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          a.reduce(<span class="hljs-keyword">function</span>(arr, n){    <span class="hljs-keyword">if</span>(n % 2 === 0){
                  arr.push(n)
              }
              <span class="hljs-built_in">return</span> arr
          }, [])
          
          // [2, 4, 6, 8, 10]
          <span class="copy-code-btn">复制代码</span></code></pre></div>`,
          category_id: 1, //1=html,css,javascript 2=jquare,lodash 3=vue,react 4=nodejs 5=小程序 6=flutter 
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'React学习笔记 --- 邂逅React',
          synopsis: '官方对它的解释：用于构建用户界面的 JavaScript 库',
          content: `<div class="markdown-body"><h3 data-id="heading-0">一 、React产生的原因</h3>
          <p><img alt="React官方简介" class="lazyload inited loaded" data-src="https://s1.ax1x.com/2020/08/15/dkeQYV.png" data-width="800" data-height="600" src="https://s1.ax1x.com/2020/08/15/dkeQYV.png"></p>
          <p>官方对它的解释：用于构建用户界面的 JavaScript 库</p>
          <blockquote>
          <p><code>React</code>是<code>FaceBook</code>在2013年开源的框架</p>
          </blockquote>
          <h4 data-id="heading-1">1.2 使用原生开发产生的问题</h4>
          <ul>
          <li>需要去处理兼容性的问题，这是十分麻烦的，而且过多兼容性代码会导致代码的冗余</li>
          <li>既要界面中的数据和交互，又需要频繁的去处理页面中的dom，十分的繁琐，且过多的重绘和回流（Reflow &amp; Repaint）会减低页面的性能</li>
          <li>数据和代码过于的分散，不统一，不利于代码的组织和维护，不利于生成良好的规范</li>
          <li>在传统的开发模式中，我们过多的去操作界面的细节（无论是前端、iOS、Android）并且需要掌握和使用大量DOM的API，当然我们可以通过jQuery来简化和适配一些API的使用</li>
          <li>数据（状态），往往会分散到各个地方，不方便管理和维护</li>
          </ul>
          <h4 data-id="heading-2">1.3 使用React的好处</h4>
          <ol>
          <li>以组件的方式去划分一个个功能模块</li>
          <li>组件内以<code>jsx</code>来描述UI的样子，以<code>state</code>来存储组件内的状态</li>
          <li>当应用的状态发生改变时，通过<code>setState</code>来修改状态，状态发生变化时，UI会自动发生更新</li>
          <li>在React中并没有像Vue模块语法中的v-for指令，而且需要我们通过JavaScript代码的方式组织数据，转成JSX
          因此 <code>vue</code>有<code>指令</code>而显得更为的<code>书写简便</code>，但是其也就没有<code>React</code>的<code>灵活性</code>那么高
          而 <code>React</code> 因为没有了<code>指令</code>,其书写全部使用的都是<code>JavaScript</code>的方式去进行编写的，所以其显得<code>更为灵活</code>,但书写起来也就相比<code>vue</code>更为的繁琐，对<code>JavaScript基本功</code>的要求也就越高</li>
          </ol>
          <h3 data-id="heading-3">二 React的特点</h3>
          <h4 data-id="heading-4">2.1 声明式编程</h4>
          <blockquote>
          <p>需求：在页面中有一个显示一个<code>Hello World</code>，并有一个按钮,</p>
          <pre><code class="copyable"> 当点击按钮的时候，
          <span class="copy-code-btn">复制代码</span></code></pre>
          </blockquote>
          <p><code>原生JS --- 命令式编程</code></p>
          <pre><code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>改变文本<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
              <span class="hljs-comment">// 获取DOM节点</span>
              <span class="hljs-keyword">const</span> pEl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'p'</span>)
              <span class="hljs-keyword">const</span> btnEl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'button'</span>)
          
              <span class="hljs-comment">// 初始化文本</span>
              <span class="hljs-keyword">let</span> content = <span class="hljs-string">'Hello World'</span>
              pEl.innerHTML = content
          
          
              <span class="hljs-comment">// 设置点击事件</span>
              btnEl.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function">() =&gt;</span> {
                  content = <span class="hljs-string">'Hello React'</span>
                  pEl.innerHTML = content
              })
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <blockquote>
          <p><code>命令式编程</code> ： 每一步操作，都是在告诉宿主环境一条条命令</p>
          </blockquote>
          <p><code>React实现 --- 声明式编程</code></p>
          <pre><code class="hljs language-JSX copyable" lang="JSX">&lt;script src=<span class="hljs-string">"https://unpkg.com/react@16/umd/react.development.js"</span> crossorigin&gt;&lt;/script&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react-dom@16/umd/react-dom.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/babel-standalone@6/babel.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
              <span class="hljs-keyword">let</span> message = <span class="hljs-string">'Hello World'</span>
          
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeText</span>(<span class="hljs-params"></span>) </span>{
                  message = <span class="hljs-string">'Hello React'</span>
                    render()
                }
          
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
                  ReactDOM.render( (
                  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{ message }<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">changeText</span> }&gt;</span>改变文本<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                ), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))
                }
          
                render()
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <blockquote>
          <p>我们只需要维护自己的状态，当状态改变时，React可以根据最新的状态去渲染我们的UI界面</p>
          <p>这一类的编程范式就是<code>声明式编程</code></p>
          </blockquote>
          <p><img alt="声明式编程" class="lazyload inited" data-src="https://s1.ax1x.com/2020/08/15/dkKdDe.md.png" data-width="800" data-height="600" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;800&quot; height=&quot;600&quot;></svg>"></p>
          <blockquote>
          <p>上图就是声明式编程的一个典型的描述</p>
          <p>我们可以预先定义好渲染界面的规则和方式（例如Vue，React，Angular）</p>
          <p>我们按照定义好的规则去维护我们的状态(数据)即可</p>
          <p>只要我们修改<code>state</code>后，可以手动（React）或者自动 (Vue)去执行这个渲染函数</p>
          <p>其会按照预先定义的规则去重新渲染页面</p>
          </blockquote>
          <h4 data-id="heading-5">2.2 组件化开发</h4>
          <p><img alt="组件化开发" class="lazyload inited loaded" data-src="https://s1.ax1x.com/2020/08/15/dkYMD0.md.png" data-width="800" data-height="600" src="https://s1.ax1x.com/2020/08/15/dkYMD0.md.png"></p>
          <blockquote>
          <p>组件化开发页面目前前端的流行趋势，我们会讲复杂的界面拆分成一个个小的组件</p>
          <p>如上图： 这个页面就是一个<code>App组件</code>, 随后在根据一个个小的功能点去进行拆分为多个组件</p>
          <p>每一组件其本身也可以继续进行拆分为更小的组件</p>
          <p>随后将这些小的组件可以在进行合并，形成一个完整的应用</p>
          </blockquote>
          <h4 data-id="heading-6">2.3 多平台适配</h4>
          <ul>
          <li>2013年，React发布之初主要是开发Web页面；</li>
          <li>2015年，Facebook推出了ReactNative，用于开发移动端跨平台；</li>
          <li>2017年，Facebook推出ReactVR，用于开发虚拟现实Web应用程序；</li>
          </ul>
          <p><img alt="React的多平台适配" class="lazyload inited loaded" data-src="https://s1.ax1x.com/2020/08/15/dkYgxA.md.png" data-width="800" data-height="600" src="https://s1.ax1x.com/2020/08/15/dkYgxA.md.png"></p>
          <h3 data-id="heading-7">三、 React的开发依赖</h3>
          <h4 data-id="heading-8">3.1开发React必须依赖三个库</h4>
          <ul>
          <li>react：包含react所必须的核心代码</li>
          <li>react-dom：react渲染在不同平台所需要的核心代码</li>
          <li>babel：将jsx转换成React代码的工具</li>
          </ul>
          <blockquote>
          <p>为什么会出现<code>react-dom</code>，在早期的<code>react</code>的版本中是没有<code>react-dom</code>这个概念的</p>
          <p><code>react-dom</code>是伴随着<code>react-native</code>的诞生而产生的</p>
          <p><code>react</code>包含了<code>react</code>和<code>react-native</code>所共同拥有的核心代码。</p>
          <p><code> react-dom</code>针对<code>web</code>和<code>native</code>所完成的事情不同</p>
          <p><code>web</code>端：<code>react-dom</code>会讲<code>jsx</code>最终渲染成真实的<code>DOM</code>，显示在浏览器中</p>
          <p><code>native</code>端：<code>react-dom</code>会讲<code>jsx</code>最终渲染成原生的控件（比如<code>Android</code>中的<code>Button</code>，<code>iOS</code>中的<code>UIButton</code>）</p>
          </blockquote>
          <blockquote>
          <p><code>Babel</code>又名 <code>Babel.js</code> 目前前端使用最为广泛的<code>编译器</code></p>
          <p><code>Babel</code>的基本职能</p>
          <ol>
          <li>
          <p>将<code>ES6</code>的语法转换为绝大多数浏览器都可以识别的<code>ES5</code>的语法</p>
          <p><img alt="Babel ES6转ES5" class="lazyload inited" data-src="https://s1.ax1x.com/2020/08/15/dkU6GF.png" data-width="800" data-height="600" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;800&quot; height=&quot;600&quot;></svg>"></p>
          <ol start="2">
          <li>
          <p>以直接编写<code>jsx</code>（<code>JavaScript XML</code>）的语法，并且让<code>babel</code>帮助我们转换成<code>React.createElement</code>形式创建的组件对象来交给<code>React</code>和<code>React-dom</code>去进行解析和渲染，所以默认情况下使用<code>React</code>开发是不需要<code>Babel</code>的, 但是<code>JSX</code>是<code>React.createElement</code>的语法糖，所以一般在开发中使用的都是<code>JSX</code>的形式</p>
          <p><img alt="Babel 解析JSX语法" class="lazyload inited" data-src="https://s1.ax1x.com/2020/08/15/dka5Os.png" data-width="800" data-height="600" src="data:image/svg+xml;utf8,<?xml version=&quot;1.0&quot;?><svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; width=&quot;800&quot; height=&quot;600&quot;></svg>"></p>
          </li>
          </ol>
          </li>
          </ol>
          </blockquote>
          <h4 data-id="heading-9">3.2 引入React依赖的方式</h4>
          <ul>
          <li>方式一：直接<code>CDN引入</code></li>
          <li>方式二：下载后，添加<code>本地依赖</code></li>
          <li>方式三：通过<code>npm</code>管理（后续脚手架再使用）</li>
          </ul>
          <blockquote>
          <p>在使用脚手架之前，暂时使用<code>CDN引入</code>的方式去进行引入</p>
          <pre><code class="hljs language-html copyable" lang="html"><span class="hljs-comment">&lt;!-- ubpkg是一个和bootCDN类似的 前端公共CDN --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react@16/umd/react.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react-dom@16/umd/react-dom.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/babel-standalone@6/babel.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          </blockquote>
          <blockquote>
          <p>补充： <code>crossorigin</code>属性</p>
          <p>在原本的情况下，我们去请求了某一个<code>跨域脚本</code>, 但是这个<code>跨域脚本</code>内部出现了问题，本地是无法读取这个错误的信息的</p>
          <p>如果在本地尝试去使用<code>window.onerror</code>去记录脚本的错误的时候，<code>跨域脚本</code>只会返回<code> Script error</code></p>
          <p>但是开启了<code>crossorigin</code>属性后，在本地也可以获取到<code>跨域脚本</code>的错误信息，但是其有2个先决条件</p>
          <ol>
          <li>
          <p>跨域脚本的服务器必须通过 <code>Access-Controll-Allow-Origin</code> 头信息允许当前域名可以获取错误信息</p>
          </li>
          <li>
          <p>请求该跨域脚本的标签（<code>script</code>, <code>img</code>，<code>audio</code>，<code>video</code> 等）上需要设置<code>crossorigin</code>，已表明其上的<code>src</code>属性是支持<code>跨域脚本</code>的</p>
          <p>且当该<code>跨域脚本</code> 出现错误的时候，需要打印详细的日志</p>
          </li>
          </ol>
          </blockquote>
          <h3 data-id="heading-10">四， React的初体验</h3>
          <h4 data-id="heading-11">4.1 Hello World</h4>
          <pre><code class="hljs language-JSX copyable" lang="JSX">&lt;!-- 该文件向外暴露（导出）了一个对象 React --&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react@16/umd/react.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          
          &lt;!-- 该文件向外暴露了一个对象 React-Dom --&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react-dom@16/umd/react-dom.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/babel-standalone@6/babel.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          
          &lt;!-- 为了使用JSX的语法，我们需要在script标签上声明type是 text/babel --&gt;
          &lt;!-- 以便于使用该属性告知React，其是使用JSX编写的代码，需要使用Babel进行转换 --&gt;
          &lt;!-- JSX是javascript的扩展，像Typescript,coffeeScript等一样，都是Javascript的语法糖，最终都要变编译成JS执行 --&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
                <span class="hljs-comment">// 注意点:</span>
                <span class="hljs-comment">//  1. ReactDOM 中的DOM 这3个字母都需要进行大写</span>
          
                <span class="hljs-comment">//  2. render是ReactDOM上的一个方法，用以渲染界面</span>
                <span class="hljs-comment">//     其有3个参数</span>
                <span class="hljs-comment">//        @param1: 需要渲染的内容</span>
                <span class="hljs-comment">//        @param2: 挂载的对象</span>
                <span class="hljs-comment">//        @param3: callback 渲染完成后会被执行的callbeck （一般不进行使用）</span>
                <span class="hljs-comment">//</span>
          
                <span class="hljs-comment">// 3. React有且只能有一个root元素</span>
                <span class="hljs-comment">//    也就是render的第一个参数，有且只能有一个根元素（最外层元素），其下可以有任意多个子节点</span>
          
                <span class="hljs-comment">// 4. render的第二个参数表示的是需要将模板插入到哪一个DOM元素中，所以需要传入dom节点对象</span>
                <span class="hljs-comment">// 因为无论是通过class的方式还是id的方式去获取对应的DOM节点都是可以的</span>
                <span class="hljs-comment">// 一般使用id去获取对应的dom节点的形式居多</span>
                
                <span class="hljs-comment">// 5, render的第一个参数中既可以写标签，也可以写组件</span>
                <span class="hljs-comment">//  render函数渲染内容的话，如果被挂载的那个对象中本身存在一定的内容，其默认是会覆盖掉原本的内容的</span>
                ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>), <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'渲染完成了'</span>))
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <h4 data-id="heading-12">4.2 修改页面中的数据</h4>
          <blockquote>
          <p>需求：在页面中有一个显示一个<code>Hello World</code>，并有一个按钮,</p>
          <pre><code class="copyable"> 当点击按钮的时候，
          <span class="copy-code-btn">复制代码</span></code></pre>
          </blockquote>
          <p><code>ES5的写法</code></p>
          <pre><code class="hljs language-JSX copyable" lang="JSX">&lt;script src=<span class="hljs-string">"https://unpkg.com/react@16/umd/react.development.js"</span> crossorigin&gt;&lt;/script&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react-dom@16/umd/react-dom.development.js"</span> <span class="hljs-attr">crossorigin</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/babel-standalone@6/babel.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
              <span class="hljs-comment">// 初始化数据</span>
              <span class="hljs-keyword">let</span> msg = <span class="hljs-string">'Hello World'</span>
          
              <span class="hljs-comment">// 按钮被点击之后的事件绑定</span>
              <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeContent</span>(<span class="hljs-params"></span>) </span>{
                 msg = <span class="hljs-string">'Hello React'</span>
                <span class="hljs-comment">// 修改完 数据以后其是不会立即去重新渲染的</span>
                <span class="hljs-comment">// 需要再次调用render函数以后才可以更新界面中的数据</span>
                
                <span class="hljs-comment">// 在实际开发过程中，一般是会使用ES6的类的写法去定义数据</span>
                <span class="hljs-comment">// 在任何情况下，都不推荐自己去手动调用render函数</span>
                 render()
               }
          
              <span class="hljs-comment">// 定义渲染函数</span>
               <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
                ReactDOM.render((
                 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{ msg }<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">changeContent</span> }&gt;</span>change content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
               ), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))
               }
          
              <span class="hljs-comment">// 界面初始化渲染</span>
               render()
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <p><code>ES6的写法</code></p>
          <pre><code class="hljs language-JSX copyable" lang="JSX">&lt;script src=<span class="hljs-string">"./dist/react.development.js"</span>&gt;&lt;/script&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/react-dom.development.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/babel.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
              <span class="hljs-comment">// 定义App组件</span>
              <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
                  <span class="hljs-comment">// 在构造函数中定义类的属性</span>
                  <span class="hljs-function"><span class="hljs-title">constructor</span>(<span class="hljs-params"></span>)</span> {
                      <span class="hljs-comment">// 调用父类的构造函数,进行父类的初始化</span>
                      <span class="hljs-built_in">super</span>()
                      <span class="hljs-comment">// React中的数据定义在state中，其是一个对象</span>
                      <span class="hljs-built_in">this</span>.state = {
                          <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello World'</span>
                      }
                  }
          
                  <span class="hljs-comment">// 定义render函数</span>
                  render () {
                      <span class="hljs-comment">// 返回渲染的内容结果,也就是这里的返回值会被作为render的第一个参数</span>
                      <span class="hljs-keyword">return</span> (
                          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
                              {/* 这是在JSX中的注释方式 */}
          
                              {/* 在React中使用大括号语法在使用变量 注意是大括号,不是mustache */}
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{ this.state.msg }<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                              {/*
                        1. 在React中使用方法的时候 事件名使用的是小驼峰，这是React中的函数，其本身对原生对应的js函数进行了一定程度的封装
                            例如 onClick是对原生onclick的封装
          
                        2. 在React中使用方法时也是使用的大括号语法
                           在大括号中可以书写js表达式或者变量
          
                        3. bind 是为了使函数调用的时候，其内部this被修改为当前实例对象
                      */}
                              <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">this.changeContent.bind</span>(<span class="hljs-attr">this</span>) }&gt;</span>change content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                          <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
                      )
                  }
          
                  <span class="hljs-comment">// 在React中调用方法的时候，其执行的时候是没有办法获取this的，也就是this不是当前类的实例对象</span>
                  <span class="hljs-comment">// 其调用的时候会 changeContent.call(undefined)</span>
                  <span class="hljs-function"><span class="hljs-title">changeContent</span>(<span class="hljs-params"></span>)</span> {
                      <span class="hljs-comment">// setState方法会在修改state中数据的时候，调用render方法，使其在修改数据的时候，去更新界面</span>
                      <span class="hljs-comment">// 不再需要我们手动的去频繁的操作DOM</span>
                      <span class="hljs-built_in">this</span>.setState({
                          <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello React'</span>
                      })
                  }
              }
          
              <span class="hljs-comment">// 渲染界面</span>
              <span class="hljs-comment">// 第一个参数在这里使用的就是之前定义的App组件</span>
              ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>))
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <blockquote>
          <p>补充: 在github上clone仓库进行源码阅读的时候，不推荐直接读master分支的内容，而是使用git checkout 到某一个具体的tag后再进行阅读</p>
          <p>因为master分支是正在开发的分支，tag是代码的快照，一般在发行版本的时候才会打上tag，所以tag上的代码才是某一个发行版本的具体源码</p>
          <p>git clone 整个仓库后使用，以下命令就可以取得该 tag 对应的代码了。</p>
          <pre><code class="hljs language-properties copyable" lang="properties"><span class="hljs-attr">git</span> <span class="hljs-string">checkout tag_name </span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <p>但是，这时候 git 可能会提示你当前处于一个“detached HEAD" 状态。</p>
          <p>因为 tag 相当于是一个快照，是不能更改它的代码的。</p>
          <p>如果要在 tag 代码的基础上做修改，你需要一个分支：</p>
          <pre><code class="hljs language-properties copyable" lang="properties"><span class="hljs-attr">git</span> <span class="hljs-string">checkout -b branch_name tag_name</span>
          <span class="copy-code-btn">复制代码</span></code></pre>
          <p>这样会从 tag 创建一个分支，然后就和普通的 git 操作一样了。</p>
          </blockquote>
          <p>下一篇 <a href="https://juejin.im/post/6861560805981650957" target="_blank">React学习笔记 --- React初体验</a></p></div>`,
          category_id: 3, //1=html,css,javascript 2=jquare,lodash 3=vue,react 4=nodejs 5=小程序 6=flutter 
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('articles', null, {})
  },
}
